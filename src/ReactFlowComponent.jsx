import { addEdge, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
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
import { PaymentInit } from './customflows/PaymentInit';
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
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    const [nodeAddedFirstTime, setNodeAddedFirstTime] = useState(false);
    const [dbType, setDbType] = React.useState('');
    // const [dbUrl, setDbUrl] = React.useState('');
    const [dbUsername, setDbUsername] = React.useState('');
    const [dbPassword, setDbPassword] = React.useState('');
    const [dbName, setDbName] = React.useState('');
    const [dbPort, setDbPort] = React.useState('');
    const [sslEncryption, setSslEncryption] = React.useState('false');
    const [clicked, setClicked] = useState(0);

    const [handleSpecialCase, setHandleSpecialCase] = useState(false)

    // const [addNode, setAddNode] = useState(false);
    const [showAddNodeForm, setShowAddNodeForm] = useState(false)
    const [selectedNodeType, setSelectedNodeType] = useState('option1');
    const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
    const [nodeClicked, setNodeClicked] = useState({});
    const [frameAdded, setFrameAdded] = useState(false);
    const [lastSelectedNodeType, setLastSelectedNodeType] = useState(null);
    const [currentNodeId, setCurrentNodeId] = useState(null);

    const [dbUrl, setDbUrl] = useState('');
    const [token, setToken] = useState('');
    const [pipeConfig, setPipeConfig] = useState('');

    // Below code is handling the adding of new node consecutively
    const latestNodeRef = useRef(null);
    useEffect(() => {
        if (nodes.length > 0) {
            const latestNode = document.querySelector(`[data-id="${nodes[nodes.length - 1].id}"]`);
            latestNodeRef.current = latestNode?.getBoundingClientRect();
        }
    }, [nodes]);


    const onConnect = useCallback((connection) => {
        console.log('Connection attempted:', connection);
        const edge = { ...connection, animated: true, id: `${edges.length + 1}` }
        setEdges(prevEdges => addEdge(edge, prevEdges));
    }, [edges, setEdges]);

    useEffect(() => {
        console.log(clicked, "Item is clicked")
    }, [clicked])

    const addNewNode = (event) => {
        setClicked(0);
        let newX;
        let newY;
        const { pageX: x, pageY: y } = event;
        const lastNode =
            clicked > 0 ?
                (document.querySelector(`[data-id="${nodes[nodes.length - 2].id}"]`)) :
                (document.querySelector(`[data-id="${nodes[nodes.length - 1].id}"]`));

        console.log(lastNode?.getBoundingClientRect(), "this is giving me the details of previous nodes")
        newX = lastNode?.getBoundingClientRect().right || 0;
        newY = lastNode?.getBoundingClientRect().top || 0;
        // newX = clicked > 0 ? newX : newX - 20;
        newY = nodeAddedFirstTime ? (newY) : (newY + 40);
        console.log(x, y, "these are the coordindates that are changer")
        newX = handleSpecialCase ? x - 65 : newX;
        newY = handleSpecialCase ? y - (y / 4) - 30 : newY;
        // setClicked(0);
        console.log(newX, newY, "huehueheuhu")

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
                    // position: { x: newX - 21, y: 260 },
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
                    // position: { x: newX - 21, y: 260 },
                    position: { x: newX, y: newY },
                    type: "ThreeWayPipe"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
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
                    // position: { x: newX - 284, y: 297 },
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
                    position: { x: newX - 610, y: -80 },
                    // position: { x: newX - 610, y: newY },
                    type: "Dashboard"
                };
                setNodes([...nodes, newNode]);
                // setAddNode(false);
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
                    // position: { x: newX - 20, y: newY - 80 },
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
        // setHandleSpecialCase(false)
    }

    const isFormValid = () => {
        switch (selectedNodeType) {
            case 'option2':
                return dbType && dbUrl && dbUsername && dbPassword;
            case 'option5':
            case 'option6':
                return pipeConfig;
            default:
                return true;
        }
    };



    const handleAddNodeClick = (nodeId, event) => {
        setHandleSpecialCase(false);
        console.log(event, "checkingggggggg")
        const { clientX: x, clientY: y } = event;
        setCurrentNodeId(nodeId);
        setFormPosition({ x, y });
        setShowAddNodeForm(true);

    };

    const handleSpecialAddCase = (nodeId, event) => {
        console.log(event, "Triggering special delete handle case")
        const { clientX: x, clientY: y } = event;
        setHandleSpecialCase(true);
        setCurrentNodeId(nodeId);
        setFormPosition({ x, y });
        setShowAddNodeForm(true);
        setClicked(clicked + 1);
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

        if (nodes.length == 3) {
            setNodeAddedFirstTime(false)
        } else {
            setNodeAddedFirstTime(true)
        }
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setShowAddNodeForm(false)

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

                    {/* {selectedNodeType === 'option2' && (
                        <>
                            <label className="block mt-2">Database Type:</label>
                            <select
                                value={dbType}
                                onChange={(e) => setDbType(e.target.value)}
                                className="bg-gray-100 p-1 w-60 rounded-xl border-black border-2"
                            >
                                <option value="mysql">MySQL</option>
                                <option value="postgresql">PostgreSQL</option>
                                <option value="mongodb">MongoDB</option>
                                <option value="oracle">Oracle</option>
                                <option value="sqlserver">SQL Server</option>
                            </select>
                            
                        </>
                    )} */}

                    {/* {selectedNodeType === 'option5' && (
                        <>
                            <label className="block mt-2">Modbus Config:</label>
                            <input
                                type="text"
                                value={pipeConfig}
                                onChange={(e) => setPipeConfig(e.target.value)}
                                className="bg-gray-100 p-1 w-60 rounded-xl border-black border-2"
                            />
                        </>
                    )} */}
                    {/* {selectedNodeType === 'option6' && (
                        <>
                            <label className="block mt-2">Protocol info:</label>
                            <input
                                type="text"
                                value={pipeConfig}
                                onChange={(e) => setPipeConfig(e.target.value)}
                                className="bg-gray-100 p-1 w-60 rounded-xl border-black border-2"
                            />
                        </>
                    )} */}
                    <button className="bg-black w-[30%] text-white p-2 rounded-xl mt-4" onClick={addNewNode}>Add</button>
                </div>
            )}
            <ReactFlow
                nodes={nodes.map(node => ({
                    ...node,
                    data: {
                        ...node.data,
                        onAddNodeClick: (event) => handleAddNodeClick(node.id, event),
                        onDeleteNodeClick: () => handleDeleteNodeClick(node.id),
                        onSpecialAddNodeClick: (event) => handleSpecialAddCase(node.id, event),
                        onSpecialDeleteNodeClick: () => handleSpecialDeleteCase(node.id),
                        hasNodeBeenAdded: !handleSpecialCase ? (!!nodeClicked[node.id] || node.data.hasNodeBeenAdded) : null,
                    },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edgeTypes={edgeTypes}
                onConnect={onConnect}
                nodeTypes={{
                    custom: CustomNode, database: DatabaseNode, Dashboard, LShapedFlow,
                    PaymentInit, Pipe, ThreeWayPipe: ThreeWayPipe, Frame
                }}
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
            </ReactFlow>
        </div >
    );
}

export default Flow;









