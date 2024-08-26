import { addEdge, Background, Controls, ReactFlow, useEdgesState } from '@xyflow/react';
import React, { useCallback } from 'react';
import { CustomNode } from './customFileForSecondFlow/CustomNode';

const initedges = [];

const nodeTypes = {
    inputNode: CustomNode
};

const initnodes = [
    {
        id: '1',
        data: {},
        position: { x: 0, y: 0 },
        type: 'inputNode',
    },

];

export const ReactFlowComponent2 = () => {
    const [edges, setEdges, onEdgesChange] = useEdgesState(initedges)
    const [nodes, setNodes, onNodesChange] = useEdgesState(initnodes)
    const onConnect = useCallback((connection) => {
        const edge = { ...connection, animated: true, id: `${edges.length + 1}` }
        setEdges(prevEdges => addEdge(edge, prevEdges))

    }, [])
    return (
        <div className='h-screen w-screen'>
            <ReactFlow edges={edges} nodes={nodes} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Background />

                <Controls />
            </ReactFlow>
        </div>
    )
}
