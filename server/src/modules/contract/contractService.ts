import { ethers } from 'ethers';
import { ABI__factory } from "@common/models/ethers/factories";
import {ServiceResponse} from "@common/models/serviceResponse";
import { logger } from '@src/server';
export interface IContractService {
    getBalance(address: string): Promise<ServiceResponse<{ userNFTs: number} | null>>;
    verifyNFT(address: string): Promise<ServiceResponse<{ userNFTs: number} | null>>;
}

export class ContractService implements IContractService {
    private _provider: ethers.providers.JsonRpcProvider;
    private _comartContractAddress: string = '0xE5c8Ab726ad5831Efdc59880BB7Be3bDaAf5ca38';

    constructor() {
        // Initialize ethers with an Ethereum provider
        this._provider = new ethers.providers
            .JsonRpcProvider('https://necessary-special-pallet.ethereum-sepolia.quiknode.pro/ad1bb18aa13dd7a68c7e81981e6b8b164e782227/');


    }

    public async verifyNFT(address: string): Promise<ServiceResponse<{ userNFTs: number; } | null>> {
        const val = await this.fetchNFTs(address);
        return new ServiceResponse<{ userNFTs: number}>(true, '', val);
    }

    public async getBalance(address: string): Promise<ServiceResponse<{ userNFTs: number} | null>> {
       const val = await this.fetchNFTs(address);

        return new ServiceResponse<{ userNFTs: number}>(true, '', val);
    }

    private async fetchNFTs(account: string) {
        try{
            logger.info(`Fetching NFTs for account ${account}`);

            // Create a contract instance
            const myContract = ABI__factory.connect(this._comartContractAddress, this._provider);
             //const myContract = new this._web3.eth.Contract(contractABI as any, account);
            const nftBalance = await myContract.balanceOf(account);
            //convert nftBalance from ethers.BigNumber to number
            return {userNFTs:Number(nftBalance)}
        }catch(error){
            console.log('Error fetching NFTs',error);
            return {userNFTs:Number(0)}
        }
    }
}