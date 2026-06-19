we.commands.onCommand.addListener((command: string): void =>
    err(() => {
        void ext.send_msg_to_active_tab({ msg: 'execute_command', command });
    }, 'seg_1001'),
);
