import * as CryptoJS from "crypto-js";

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


console.log(blockChain);

//npm add crypto-js   .... to create hash

export{};