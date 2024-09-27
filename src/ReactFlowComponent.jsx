import { addEdge, Background, Controls, MiniMap, Panel, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DefaultImage from "./asset/DefaultImage.svg";
import CustomEdge from './customflows/CustomEdge';
import CustomNode from './customflows/CustomNode';
import Frame from './customflows/Frame';
import ReusableNode from './organisedFlows/ReusableNode';

const flowKey = 'example-flow';

const initEdges = [];
const edgeTypes = {
    'custom-edge': CustomEdge,
};

const initNodes = [

    {
        id: '1',
        data: {
            src: DefaultImage,
        },
        position: { x: 0, y: 220 },
        type: 'custom',
    }
];

function Flow() {


    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    // const [specialNodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    const [nodeAddedFirstTime, setNodeAddedFirstTime] = useState(false);
    const [handleSpecialCase, setHandleSpecialCase] = useState(false)
    const [showAddNodeForm, setShowAddNodeForm] = useState(false)
    const [showSpecAddNodeForm, setShowSpecAddNodeForm] = useState(false)
    const [selectedNodeType, setSelectedNodeType] = useState('option1');
    const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
    const [nodeClicked, setNodeClicked] = useState({});
    const [frameAdded, setFrameAdded] = useState(false);
    const [shifted, setShifted] = useState(0);
    const [rfInstance, setRfInstance] = useState(null);
    const [applyScroll, setApplyScroll] = useState(false);
    const [lastSelectedNodeType, setLastSelectedNodeType] = useState(null);
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [dbUrl, setDbUrl] = useState('');
    const [token, setToken] = useState('');
    const [pipeConfig, setPipeConfig] = useState('');
    const [changedX, setChangedX] = useState(0)
    const [changedY, setChangedY] = useState(0)

    // Below code is handling the adding of new node consecutively
    const latestNodeRef = useRef(null);
    const containerRef = useRef(null);

    const { setViewport, getViewport } = useReactFlow();

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);
    // Restore flow from local storage
    const restoreFlow = async () => {
        try {
            const storedFlow = localStorage.getItem(flowKey);

            if (!storedFlow) {
                console.warn("No saved flow data found in local storage.");
                return;
            }

            console.log("Stored flow data:", storedFlow); // Log raw data

            const flow = JSON.parse(storedFlow);

            console.log("Parsed flow data:", flow); // Log parsed data

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport || {}; // Ensure flow.viewport exists
                console.log("Viewport values:", { x, y, zoom }); // Log viewport values
                setNodes(flow.nodes || []); // Log nodes array
                setViewport({ x, y, zoom });
            } else {
                console.warn("Failed to parse flow data from local storage.");
            }
        } catch (error) {
            console.error("Error restoring flow data:", error);
        }
    };

    const onConnect = useCallback((connection) => {
        const edge = { ...connection, animated: true, id: `${edges.length + 1}` }
        setEdges(prevEdges => addEdge(edge, prevEdges));
    }, [edges, setEdges]);

    useEffect(() => {
        if (nodes.length > 0) {
            const latestNode = document.querySelector(`[data-id="${nodes[nodes.length - 1].id}"]`);
            latestNodeRef.current = latestNode?.getBoundingClientRect();
            if (latestNode) {
                const rect = latestNode.getBoundingClientRect();
                if (rect && containerRef.current) {
                    const containerRect = containerRef.current.getBoundingClientRect();
                    const { x, y, zoom } = getViewport();
                    setChangedX(x);
                    setChangedY(y);

                    if (containerRect.right - rect.right < 50) {
                        setApplyScroll(true)
                        setShifted(shifted + 1);
                        const newViewportX = x - 500 / zoom;
                        setViewport({ x: newViewportX, y, zoom, transition: { duration: 1000 } });
                    }
                }
            }
        }
    }, [nodes, getViewport, setViewport]);

    const addNewNode = (event) => {
        let newX;
        let newY;
        const { clientX: x, clientY: y } = event;
        const lastNode = document.querySelector(`[data-id="${currentNodeId}"]`);

        newX = lastNode?.getBoundingClientRect().right || 0;
        newY = lastNode?.getBoundingClientRect().top || 0;
        newY = nodeAddedFirstTime ? (newY) : (newY + 40);
        newX = handleSpecialCase ? x - 65 : newX;
        newY = handleSpecialCase ? y - (y / 5) - 13 : newY;
        const { x: viewportX, y: viewportY, zoom } = getViewport();
        newX = (newX - viewportX) / zoom;
        newY = (newY - viewportY) / zoom;

        let svgContent;
        const newNode = {
            id: `${nodes.length + 1}`,
            data: {
                svg: svgContent,
                pos: "top",
                text: selectedNodeType.toString()
            },
            position: { x: newX, y: newY },
            type: "ReusableNode"
        };
        setNodes([...nodes, newNode]);
        setShowAddNodeForm(false);
        setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
        setCurrentNodeId(null);
        setLastSelectedNodeType(selectedNodeType);
        setNodeAddedFirstTime(true);
        setSelectedNodeType('option1')
    }

    const handleAddNodeClick = (nodeId, event) => {
        const { clientX: x, clientY: y } = event;
        setHandleSpecialCase(false);
        setCurrentNodeId(nodeId)
        setFormPosition({ x, y });
        setShowAddNodeForm(true);

    };
    const handleDeleteNodeClick = (nodeId) => {
        setHandleSpecialCase(false)

        setNodes((nds) => {
            const nodeIndex = nds.findIndex((node) => node.id === nodeId);

            const previousNode = nodeIndex > 0 ? nds[nodeIndex - 1] : null;

            if (previousNode && nodeClicked[previousNode.id]) {
                setNodeClicked((prev) => ({
                    ...prev,
                    [previousNode.id]: false,
                }));
            }

            return nds.filter((node) => node.id !== nodeId);
        });

        if (nodes.length == 3) {
            setNodeAddedFirstTime(false)
        } else {
            setNodeAddedFirstTime(true)
        }
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setShowAddNodeForm(false)

    };


    return (
        <div style={{
            height: "100vh",
            width: "100vw",
        }}>
            {showAddNodeForm && (
                <div className="h-fit z-50 absolute text-xs w-fit p-3 bg-[#4CA9A6] shadow-xl rounded-2xl"
                    style={{ top: formPosition.y, left: formPosition.x }}>
                    <label className="font-semibold text-xs mt-4 block" htmlFor="dropdown">Nodes- </label>
                    <select
                        onChange={(e) => setSelectedNodeType(e.target.value)}
                        className="bg-gray-200 w-60 p-1 rounded-xl border-black border-2 text-black mt-2"
                        id="dropdown">
                        <option value="options">Select</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        {/* <option value="Kafka">Kafka</option>
                        <option value="Nats">Nats</option> */}
                        <option value="Database">Database</option>
                    </select>
                    <button className="bg-black w-[30%] text-white p-2 rounded-xl mt-4" onClick={addNewNode}>Add</button>
                </div>
            )}
            <div ref={containerRef}

                style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <ReactFlow
                    nodes={nodes.map(node => ({
                        ...node,
                        data: {
                            ...node.data,
                            onAddNodeClick: (event) => handleAddNodeClick(node.id, event),
                            onDeleteNodeClick: () => handleDeleteNodeClick(node.id),
                            hasNodeBeenAdded: handleSpecialCase ? null : (!!nodeClicked[node.id] || node.data.hasNodeBeenAdded),
                        },
                    }))}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    colorMode='light'
                    edgeTypes={edgeTypes}
                    onInit={setRfInstance}
                    onConnect={onConnect}
                    zoomOnScroll={true}
                    nodeTypes={{
                        custom: CustomNode,
                        Frame, ReusableNode: ReusableNode
                    }}
                >
                    <Controls />
                    <Panel position="top-right">
                        <button className='border-2 border-white rounded-lg shadow-2xl text-white p-2 m-2 bg-[#4CA9A6] ' onClick={restoreFlow}>Restore</button>
                        <button className='border-2 border-white rounded-lg shadow-2xl text-white p-2 pl-4 pr-4 m-2 bg-[#4CA9A6]' onClick={onSave}>Save</button>
                        {/* Add additional buttons and controls as needed */}
                    </Panel>
                    <Background />
                    <MiniMap nodeStrokeWidth={3} zoomable pannable />
                </ReactFlow>
            </div>

        </div >
    );
}

export default Flow;



