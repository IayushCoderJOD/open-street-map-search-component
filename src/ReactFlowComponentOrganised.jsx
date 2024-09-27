import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DefaultImage from "./asset/DefaultImage.svg";
import { Option2SVG, Option3SVG, Option4SVG, Option5SVG, Option6SVG, Option7SVG, Option8SVG, OptionDefaultSVG } from './customflows/Constant';
import CustomEdge from './customflows/CustomEdge';
import CustomNode from './customflows/CustomNode';
import Dashboard from './customflows/Dashboard';
import DatabaseNode from './customflows/DatabaseNode';
import Frame from './customflows/Frame';
import LShapedFlow from './customflows/LSHapedFlow';
import Pipe from './customflows/Pipe';
import ThreeWayPipe from './customflows/ThreeWayPipe';
const initEdges = [];
const edgeTypes = {
    'custom-edge': CustomEdge,
};

const initNodes = [

    {
        id: '1',
        data: {
            src: Option4SVG,
            text: "Frame Node",
        },
        position: { x: 450, y: 192 },
        type: 'Frame',
    },
    {
        id: '2',
        data: {
            src: DefaultImage,
            text: "Raw Data"
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
                        console.log("here the state scroll")
                        console.log(applyScroll)
                        setApplyScroll(true)
                        console.log(applyScroll)
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
        // const lastNode =
        //     clicked != 0 ?
        //         (document.querySelector(`[data-id="${nodes[nodes.length - 2].id}"]`)) :
        //         (document.querySelector(`[data-id="${nodes[nodes.length - 1].id}"]`));

        const lastNode = document.querySelector(`[data-id="${currentNodeId}"]`);

        newX = lastNode?.getBoundingClientRect().right || 0;
        newY = lastNode?.getBoundingClientRect().top || 0;

        // newX = clicked > 0 ? newX : newX - 20;
        newY = nodeAddedFirstTime ? (newY) : (newY + 40);
        newX = handleSpecialCase ? x - 65 : newX;
        newY = handleSpecialCase ? y - (y / 5) - 13 : newY;


        // from here onwards the logic is handled by using getViewport();
        const { x: viewportX, y: viewportY, zoom } = getViewport();
        newX = (newX - viewportX) / zoom;
        newY = (newY - viewportY) / zoom;

        let svgContent;

        switch (selectedNodeType) {
            case 'option2':
                svgContent = Option2SVG;
                break;
            case 'option3':
                svgContent = Option3SVG;
                break;
            case 'option4':
                svgContent = Option4SVG;
                break;
            case 'option5':
                svgContent = Option5SVG;
                break;
            case 'option6':
                svgContent = Option6SVG;
                break;
            case 'option7':
                svgContent = Option7SVG;
                break;
            case 'option8':
                svgContent = Option8SVG;
                break;
            default:
                svgContent = OptionDefaultSVG;
                break;
        }

        switch (selectedNodeType) {
            case 'option4': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: 450, y: 190 },
                    type: "Frame"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            case 'option5': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Modbus"
                    },

                    position: { x: newX, y: newY },
                    type: "Pipe"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            case 'option6': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Protocol"
                    },
                    position: { x: newX, y: newY },
                    type: "ThreeWayPipe"
                };
                setNodes([...nodes, newNode]);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            case 'option7': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Data Expl"
                    },
                    position: { x: newX - 284, y: newY },
                    type: "LShapedFlow"
                };
                setNodes([...nodes, newNode]);
                setLastSelectedNodeType(selectedNodeType);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setCurrentNodeId(null);
                break;
            }
            case 'option8': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: newX - (newX / 2), y: -80 },

                    type: "Dashboard"
                };
                setNodes([...nodes, newNode]);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            default: {

                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: newX, y: newY },
                    type: "database"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
            };
        }
        setDbUrl('');
        setToken('');
        setPipeConfig('');
        setNodeAddedFirstTime(true);
        setSelectedNodeType('option1')
    }



    const addNewSpecNode = (event) => {
        let newX;
        let newY;

        const { pageX: x, pageY: y } = event;
        const lastNode = document.querySelector(`[data-id="${currentNodeId}"]`);

        newX = lastNode?.getBoundingClientRect().right || 0;
        newY = lastNode?.getBoundingClientRect().top || 0;
        newY = nodeAddedFirstTime ? (newY) : (newY + 40);
        newX = handleSpecialCase ? x - 65 : newX;
        newY = handleSpecialCase ? y - (y / 5) - 13 : newY;
        // newX = applyScroll ? newX + 500 * shifted : newX;
        const { x: viewportX, y: viewportY, zoom } = getViewport();
        newX = (newX - viewportX) / zoom;
        newY = (newY - viewportY) / zoom;



        let svgContent;

        switch (selectedNodeType) {
            case 'option2':
                svgContent = Option2SVG;
                break;
            case 'option3':
                svgContent = Option6SVG;
                break;
            default:
                svgContent = OptionDefaultSVG;
                break;
        }

        switch (selectedNodeType) {
            case 'option2':
                svgContent = Option2SVG;
                break;
            case 'option3':
                svgContent = Option3SVG;
                break;
            case 'option4':
                svgContent = Option4SVG;
                break;
            case 'option5':
                svgContent = Option5SVG;
                break;
            case 'option6':
                svgContent = Option6SVG;
                break;
            case 'option7':
                svgContent = Option7SVG;
                break;
            case 'option8':
                svgContent = Option8SVG;
                break;
            default:
                svgContent = OptionDefaultSVG;
                break;
        }

        switch (selectedNodeType) {
            case 'option4': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: 450, y: 190 },
                    type: "Frame"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            case 'option5': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Modbus"
                    },

                    position: { x: newX, y: newY },
                    type: "Pipe"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            case 'option6': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Protocol"
                    },
                    position: { x: newX, y: newY },
                    type: "ThreeWayPipe"
                };
                setNodes([...nodes, newNode]);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);

                break;
            }
            case 'option7': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "Data Expl"
                    },
                    position: { x: newX - 284, y: newY },
                    type: "LShapedFlow"
                };
                setNodes([...nodes, newNode]);
                setLastSelectedNodeType(selectedNodeType);
                // setAddNode(false);
                setShowAddNodeForm(false);
                setCurrentNodeId(null);
                break;
            }
            case 'option8': {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: newX - (newX / 2), y: -80 },

                    type: "Dashboard"
                };
                setNodes([...nodes, newNode]);
                setShowAddNodeForm(false);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
                break;
            }
            default: {
                const newNode = {
                    id: `${nodes.length + 1}`,
                    data: {
                        svg: svgContent,
                        pos: "top",
                        text: "hey there"
                    },
                    position: { x: newX, y: newY },
                    type: "database"
                };
                setNodes([...nodes, newNode]);
                setNodeClicked((prev) => ({ ...prev, [currentNodeId]: true }));
                setCurrentNodeId(null);
                setLastSelectedNodeType(selectedNodeType);
            };
        }

        setShowSpecAddNodeForm(false)
        setDbUrl('');
        setToken('');
        setPipeConfig('');
        setNodeAddedFirstTime(true);
        setSelectedNodeType('option1')
        // setHandleSpecialCase(false)
    }




    const handleAddNodeClick = (nodeId, event) => {
        const { clientX: x, clientY: y } = event;
        setHandleSpecialCase(false);
        setCurrentNodeId(nodeId)
        setFormPosition({ x, y });
        setShowAddNodeForm(true);

    };

    const handleSpecialAddCase = (nodeId, event) => {
        const { clientX: x, clientY: y } = event;
        setHandleSpecialCase(true);
        setCurrentNodeId(nodeId);
        setFormPosition({ x, y });
        setShowSpecAddNodeForm(true)
        setShowAddNodeForm(false);
    };
    const handleSpecialDeleteCase = (nodeId) => {
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

        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setShowSpecAddNodeForm(false)

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
        <div className="h-screen w-screen">

            {showSpecAddNodeForm && (
                <div className="h-fit z-50 absolute text-xs w-fit p-3 bg-blue-800 bg-opacity-50 shadow-xl rounded-2xl"
                    style={{ top: formPosition.y, left: formPosition.x }}>
                    <label className="font-semibold text-xs mt-4 block" htmlFor="dropdown">Nodes- </label>
                    <select
                        onChange={(e) => setSelectedNodeType(e.target.value)}
                        className="bg-gray-200 w-60 p-1 rounded-xl border-black border-2 text-black mt-2"
                        id="dropdown">
                        <option value="option1">Select</option>
                        <option value="option2">Database</option>
                        <option value="option5">Modbus</option>
                        <option value="option6">Protocol</option>
                        <option value="option8">Dashboard</option>
                    </select>
                    <button className="bg-black w-[30%] text-white p-2 rounded-xl mt-4" onClick={addNewSpecNode}>Add</button>
                </div>
            )}
            {showAddNodeForm && (
                <div className="h-fit z-50 absolute text-xs w-fit p-3 bg-blue-800 bg-opacity-50 shadow-xl rounded-2xl"
                    style={{ top: formPosition.y, left: formPosition.x }}>
                    <label className="font-semibold text-xs mt-4 block" htmlFor="dropdown">Nodes- </label>
                    <select
                        onChange={(e) => setSelectedNodeType(e.target.value)}
                        className="bg-gray-200 w-60 p-1 rounded-xl border-black border-2 text-black mt-2"
                        id="dropdown">
                        <option value="option1">Select</option>
                        <option value="option2">Database</option>
                        <option value="option5">Modbus</option>
                        <option value="option6">Protocol</option>
                        <option value="option8">Dashboard</option>
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
                            onSpecialAddNodeClick: (event) => handleSpecialAddCase(node.id, event),
                            onSpecialDeleteNodeClick: () => handleSpecialDeleteCase(node.id),
                            hasNodeBeenAdded: handleSpecialCase ? null : (!!nodeClicked[node.id] || node.data.hasNodeBeenAdded),

                        },
                    }))}

                    edges={edges}
                    onNodesChange={onNodesChange}
                    colorMode='light'
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    zoomOnScroll={true}
                    nodeTypes={{
                        custom: CustomNode, database: DatabaseNode, Dashboard, LShapedFlow,
                        Pipe, ThreeWayPipe: ThreeWayPipe, Frame,
                    }}
                >
                    <Controls />
                    <Background />
                    <MiniMap nodeStrokeWidth={3} zoomable pannable />
                </ReactFlow>
            </div>

        </div >
    );
}

export default Flow;
