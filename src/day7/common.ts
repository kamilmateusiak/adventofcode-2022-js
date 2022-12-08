import * as readline from 'readline';
import * as fs from 'fs';

class Node {
  nodes: {[key: string]: Node} = {}
  parent: Node | null;
  size: number;
  type: 'directory' | 'file'

  constructor(parent: Node | null, type: 'directory' | 'file', size?: number) {
    this.parent = parent;
    this.type = type;
    this.size = size || 0;
  }
}

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day7.txt'),
  });

  const data: Node = new Node(null, 'directory');
  let currentNode: Node = data;

  for await (const line of rd) {
    if (line === '$ cd /') {
      currentNode = data;
      continue;
    }

    if (line.startsWith('$ cd ') && line !== '$ cd ..') {
      currentNode = currentNode?.nodes[line.substring(5)]
      continue
    }

    if (line.startsWith('$ cd ..')) {
      if (currentNode?.parent) {
        currentNode = currentNode.parent;
      } else {
        throw new Error('No parent directory')
      }
      continue
    }

    if (line.startsWith('dir')) {
      currentNode.nodes[line.substring(4)] = new Node(currentNode, 'directory')
      continue;
    }

    if (line === '$ ls') {
      continue;
    }

    const [size, name] = line.split(' ');
    currentNode.nodes[name] = new Node(currentNode, 'file', Number(size))
  }

  return data;
}


export const fillSizes = (data: Node): number => {
  if (data.type === 'directory') {
    data.size = Object.values(data.nodes).reduce((acc, node) => {
      if (node.type === 'directory') {
        fillSizes(node)
      }

      return acc + node.size;
    }, data.size);
  }

  return data.size;
}

export const getAllDirSizes = (data: Node): number[] => {
  return Object.values(data.nodes).reduce<number[]>((acc, node) => {
    if (node.type === 'file') {
      return acc;
    }

    acc.push(node.size);
    acc.push(...getAllDirSizes(node))

    return acc;
  }, [])
}
