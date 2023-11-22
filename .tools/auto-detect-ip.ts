import { BunFile } from 'bun';
import os from 'node:os';

const NETWORK_INTERFACE = process.env.NETWORK_INTERFACE;

if (!NETWORK_INTERFACE) {
  console.error(
    'Could not auto detect IP: NETWORK_INTERFACE env variable is not set',
  );
  process.exit(0);
}

const networkInterfaces = os.networkInterfaces();

const networkInterface = networkInterfaces[NETWORK_INTERFACE];

if (networkInterface) {
  const ipv4 = networkInterface.find((ip) => ip.family === 'IPv4');

  if (ipv4) {
    const envFile = Bun.file('./.env.local');
    const envFileExists = await envFile.exists();

    const envSampleFile = Bun.file('./.env.local.sample');
    const envSampleFileExists = await envSampleFile.exists();

    let file: BunFile;

    if (envFileExists) {
      file = envFile;
    } else if (envSampleFileExists) {
      file = envSampleFile;
    } else {
      console.error('No .env.local or .env.local.sample file found.');

      process.exit(1);
    }

    const fileContent = await file.text();
    const [firstRow, ...rows] = fileContent.split('\n');

    const newFirstRow = `HOST="${ipv4.address}" # auto-detected`;

    if (firstRow.startsWith('HOST=')) {
      await Bun.write('./.env.local', [newFirstRow, ...rows].join('\n'));
      console.log('Updated .env.local file with auto-detected IP address.');

      process.exit(0);
    }

    await Bun.write(
      './.env.local',
      [newFirstRow, firstRow, ...rows].join('\n'),
    );
    console.log('Updated .env.local file with auto-detected IP address.');

    process.exit(0);
  }
} else {
  console.error(
    `Could not auto detect IP: Network interface "${NETWORK_INTERFACE}" not found.`,
  );

  const networkInterfaceData = [];

  for (const networkInterface in networkInterfaces) {
    const ips = networkInterfaces[networkInterface];
    if (ips) {
      for (const ip of ips) {
        if (!ip.internal && ip.family === 'IPv4') {
          networkInterfaceData.push({
            name: networkInterface,
            ip: ip.address,
          });
        }
      }
    }
  }

  console.error(
    'Suggested network interfaces:',
    networkInterfaceData.map((i) => `\n-> "${i.name}" - ${i.ip}`).join(''),
  );
  console.error(
    'Please set the NETWORK_INTERFACE env variable with the desired network interface name.',
  );

  process.exit(1);
}
