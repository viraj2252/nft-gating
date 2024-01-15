import express, { Router } from 'express';

import { ContractController } from '@modules/contract/contractController';
import { ContractService, IContractService } from '@modules/contract/contractService';

const router: Router = express.Router();
const contractService: IContractService = new ContractService();
const controller: ContractController = new ContractController(contractService);

router.get('/', controller.test);
router.get('/:address', controller.getBalance);
router.post('/verify-nft', controller.verifyNFT);

export const contractRouter: Router = router;
