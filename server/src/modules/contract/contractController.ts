import { Request, Response } from 'express';

import { handleServiceResponse } from '@common/utils/responseHandler';
import { IContractService } from '@modules/contract/contractService';
import { ServiceResponse } from '@common/models/serviceResponse';

export class ContractController {
  private readonly _service: IContractService;

  constructor(service: IContractService) {
    this._service = service;
  }

  getBalance = async (request: Request, response: Response) => {
    const serviceResponse = await this._service.getBalance(request.params.address as string);
    handleServiceResponse(serviceResponse, response);
  };

  verifyNFT = async (request: Request, response: Response) => {
    console.log(request.body);
    const serviceResponse = await this._service.verifyNFT(request.body.walletAddress as string);
    handleServiceResponse(serviceResponse, response);
  };

  test = async (_: Request, response: Response) => {
    const serviceResponse = new ServiceResponse(true, 'Service is healthy.', null);
    handleServiceResponse(serviceResponse, response);
  };
}
