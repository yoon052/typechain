import crypto from 'crypto';

interface BlockShape {
  prevHash: string;
  height: number;
  data: string;
  hash: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class BlockChain {
  Blocks: Block[];
  constructor() {
    this.Blocks = [];
  }
  private getPrevHash() {
    if (this.Blocks.length == 0) return '';
    else return this.Blocks[this.Blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.Blocks.length + 1,
      data
    );
    this.Blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.Blocks];
  }
}

const blockchain = new BlockChain();

blockchain.addBlock('First one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');
blockchain.addBlock('Fourth Block');

console.log(blockchain.getBlocks());
