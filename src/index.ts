import * as CryptoJS from "crypto-js";
//npm add crypto-js   .... to create hash

class Block {
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        data:string, 
        timestamp:number
    ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

    static validStructure = (aBlock: Block) : boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" && 
        typeof aBlock.data === "string";


    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;       
    }
}

const genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockChain;

const getLastestBlock = () : Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {

    const previousBlock: Block = getLastestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);

    addBlock(newBlock);

    return newBlock;
};

const getHashForBlock = (B: Block): string => 
    Block.calculateBlockHash(
        B.index, 
        B.previousHash, 
        B.data, 
        B.timestamp);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {

    if (isBlockValid(candidateBlock, getLastestBlock())) {
        blockChain.push(candidateBlock);
    }
}

//console.log(createNewBlock("Hello"), createNewBlock("byebye"));

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export{};