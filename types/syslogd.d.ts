declare module 'syslogd' {
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
    listen(port: number, callback: (e: Error) => void): void;
  }

  export = daemon;

  function daemon(callback: (data: Data) => void): Daemon;

  namespace daemon {
  }

}
