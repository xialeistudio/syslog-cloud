import Admin from './models/admin';
import Syslog from './models/syslog';

(async () => {
  console.time('initialize...Admin');
  await Admin.sync({ force: true });
  console.timeEnd('initialize...Admin');
  console.time('initialize...Syslog');
  await Syslog.sync({ force: true });
  console.timeEnd('initialize...Syslog');
  process.exit();
})();
