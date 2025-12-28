const input = Deno.readTextFileSync("./solveFor2022/question7/input.txt");

const DIRECTORIES = { "/": [] };
let currentPath = [];

const parseInput = () => {
  const commands = [];
  const instructions = input.split("\n");
  const currentCommand = [];

  for (const inst of instructions) {
    if (inst.startsWith("$")) {
      commands.push([...currentCommand]);
      currentCommand.length = 0;
    }

    currentCommand.push(inst);
  }

  commands.push(currentCommand);
  return commands.slice(1);
};

const cd = (command) => {
  const [, , dir] = command.split(" ");

  if (dir === "/") {
    currentPath = ["/"];
  } else if (dir === "..") {
    currentPath.pop();
  } else {
    currentPath.push(dir);
  }

  const pathKey = currentPath.join("/");
  if (!(pathKey in DIRECTORIES)) {
    DIRECTORIES[pathKey] = [];
  }
};

const ls = (command) => {
  const pathKey = currentPath.join("/");
  for (let index = 1; index < command.length; index++) {
    if (command[index].includes("dir")) {
      const dirName = command[index].split(" ")[1];
      DIRECTORIES[pathKey].push(`${pathKey}/${dirName}`);
    } else {
      DIRECTORIES[pathKey].push(command[index]);
    }
  }
};

const calculateTotalDirSize = (contents) => {
  let totalSize = 0;

  for (const con of contents) {
    if (DIRECTORIES[con]) {
      totalSize += calculateTotalDirSize(DIRECTORIES[con]);
    } else {
      totalSize += +con.split(" ")[0];
    }
  }

  return totalSize;
};

const calculateTotalSize = (sizes) => {
  for (const dir in DIRECTORIES) {
    sizes[dir] = calculateTotalDirSize(DIRECTORIES[dir]);
  }
};

const part1 = () => {
  const commands = parseInput();
  // console.log(commands);

  for (const com of commands) {
    if (com[0].includes("cd")) cd(com[0]);
    else if (com[0].includes("ls")) ls(com);
  }

  console.log(DIRECTORIES);

  const totalSize = calculateTotalSize();
  console.log({ totalSize });
};

// part1();

const part2 = () => {
  const commands = parseInput();
  // console.log(commands);

  for (const com of commands) {
    if (com[0].includes("cd")) cd(com[0]);
    else if (com[0].includes("ls")) ls(com);
  }

  const sizes = {};
  calculateTotalSize(sizes);
  const unusedSpace = 70000000 - sizes["/"];
  const requiredSpace = 30000000 - unusedSpace;

  const candidate = Object.values(sizes).filter((x) => x >= requiredSpace);
  const deletingSize = Math.min(...candidate);
  console.log({ sizes, unusedSpace, candidate, deletingSize });
};

part2();
