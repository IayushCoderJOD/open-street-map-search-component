export const fieldsMapping = {
    'Frontend': [
        { label: 'git_branch', name: 'git_branch', type: 'text', required: true },
        { label: 'git_repo_url', name: 'git_repo_url', type: 'text', required: true },
        { label: 'job_name', name: 'job_name', type: 'text', required: false },
    ],

    // 'Backend': [
    //     { label: 'Backend Technology', name: 'BE', type: 'text', required: true },
    //     { label: 'Framework/Library', name: 'BackendFramework', type: 'text', required: true },
    //     { label: 'Authentication Method', name: 'AuthMethod', type: 'text', required: false },
    // ],
    'Backend': [
        { label: 'git_branch', name: 'git_branch', type: 'text', required: true },
        { label: 'git_repo_url', name: 'git_repo_url', type: 'text', required: true },
        { label: 'job_name', name: 'job_name', type: 'text', required: false },
    ],

    'Kafka': [
        { label: 'Kafka Broker URL', name: 'KafkaBrokerUrl', type: 'text', required: true },
        { label: 'Topic Name', name: 'KafkaTopic', type: 'text', required: true },
        { label: 'Replication Factor', name: 'ReplicationFactor', type: 'number', required: false },
        { label: 'Consumer Group', name: 'ConsumerGroup', type: 'text', required: false },
    ],

    'Nats': [
        { label: 'NATS Server URL', name: 'NatsServerUrl', type: 'text', required: true },
        { label: 'Subject Name', name: 'NatsSubject', type: 'text', required: true },
        { label: 'Max Payload Size', name: 'MaxPayloadSize', type: 'number', required: false },
        { label: 'Queue Group', name: 'QueueGroup', type: 'text', required: false },
        { label: 'TLS Configuration', name: 'TLSConfig', type: 'text', required: false },
    ],

    'Database': [
        { label: 'git_branch', name: 'git_branch', type: 'text', required: true },
        { label: 'git_repo_url', name: 'git_repo_url', type: 'text', required: true },
        { label: 'job_name', name: 'job_name', type: 'text', required: false },
    ],

};
