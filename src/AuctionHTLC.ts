import { BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts"
import {
  AuctionHTLC,
  AuctionCancel,
  AuctionExpire,
  AuctionStart,
  AuctionSuccess,
  ContractCancel,
  ContractRefund,
  ContractSetHashlock,
  ContractSetShare,
  ContractStart,
  ContractWithdraw
} from "../generated/AuctionHTLC/AuctionHTLC"
import { HTLC, Auction } from "../generated/schema"

export function handleAuctionStart(event: AuctionStart): void {
  let entity = new Auction(event.params.auctionId.toString());

  entity.id = event.params.auctionId.toString();
  entity.publisher = event.params.publisher;
  entity.advertiser = new Bytes(0);
  entity.tokenGroup = event.params.tokenGroup;
  entity.tokenId = event.params.tokenId;
  entity.startPrice = event.params.startPrice;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.timeEndToken = event.params.timeEndToken;
  entity.bidPrice = BigInt.fromI32(0);
  entity.state = "start";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleAuctionSuccess(event: AuctionSuccess): void {
  let entity = new Auction(event.params.auctionId.toString());

  entity.advertiser = event.params.advertiser;
  entity.bidPrice = event.params.bidPrice;
  entity.state = "success";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleAuctionCancel(event: AuctionCancel): void {
  let entity = new Auction(event.params.auctionId.toString());

  entity.state = "cancel";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleAuctionExpire(event: AuctionExpire): void {
  let entity = new Auction(event.params.auctionId.toString());

  entity.state = "expire";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractStart(event: ContractStart): void {
  let entity = new HTLC(event.params.contractId.toString());

  entity.id = event.params.contractId.toString();
  entity.publisher = event.params.publisher;
  entity.advertiser = event.params.advertiser;
  entity.tokenGroup = event.params.tokenGroup;
  entity.tokenId = event.params.tokenId;
  entity.amount = event.params.amount;
  entity.hashlock = new Bytes(0);
  entity.timelock = event.params.timelock;
  entity.shares = [];
  entity.totalShares = BigInt.fromI32(0);
  entity.state = "start";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractRefund(event: ContractRefund): void {
  let entity = new HTLC(event.params.contractId.toString());

  entity.state = "refund";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractWithdraw(event: ContractWithdraw): void {
  let entity = new HTLC(event.params.contractId.toString());

  entity.state = "withdraw";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractCancel(event: ContractCancel): void {
  let entity = new HTLC(event.params.contractId.toString());

  entity.state = "cancel";
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractSetHashlock(event: ContractSetHashlock): void {
  let entity = new HTLC(event.params.contractId.toString());

  entity.hashlock = event.params.hashlock;
  entity.totalShares = event.params.totalShares;
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleContractSetShare(event: ContractSetShare): void {
  let entity = HTLC.load(event.params.contractId.toString());

  if (entity.shares === [] || entity.shares.length === 0) {
    entity.shares = [event.params.share];
    entity.timestamp = event.params.timestamp;
  } else {
    let shares = entity.shares;
    shares.push(event.params.share);
    entity.shares = shares;
    entity.timestamp = event.params.timestamp;
  }
  entity.save();
}


