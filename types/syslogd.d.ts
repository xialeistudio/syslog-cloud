declare module 'syslogd' {
  export = daemon;

  function daemon(callback: (data: daemon.Data) => void): daemon.Daemon;

  namespace daemon {
    interface Data {
      facility: number;
      severity: number;
      tag: string;
      time: any;
      hostname: string;
      address: string;
      family: string;
      port: number;
      size: number;
      msg: string;
    }

    interface Daemon {
      listen(port: number, callback?: (e: Error) => void): void;
    }
  }

}
