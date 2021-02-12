import { BigInt } from "@graphprotocol/graph-ts"
import {
  AuctionHTLC,
  AuctionStart,
  AuctionSuccess,
  ContractRefund,
  ContractSetHashlock,
  ContractSetShare,
  ContractStart,
  ContractWithdraw
} from "../generated/AuctionHTLC/AuctionHTLC"
import { HTLC, Auction } from "../generated/schema"

export function handleAuctionStart(event: AuctionStart): void {
  let entity = Auction.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new Auction(event.transaction.from.toHex());
  }

  entity.id = event.params.auctionId.toString();
  entity.publisher = event.params.publisher;
  entity.tokenGroup = event.params.tokenGroup;
  entity.tokenId = event.params.tokenId;
  entity.startPrice = event.params.startPrice;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;
  entity.tokenEndTime = event.params.endTime;
  entity.active = event.params.active;

  entity.save()
}

export function handleAuctionSuccess(event: AuctionSuccess): void {
  let entity = Auction.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new Auction(event.transaction.from.toHex());
  }

  entity.id = event.params.auctionId.toString();
  entity.publisher = event.params.publisher;
  entity.advertiser = event.params.advertiser;
  entity.tokenGroup = event.params.tokenGroup;
  entity.tokenId = event.params.tokenId;
  entity.bidPrice = event.params.bidPrice;
  entity.active = event.params.active;

  entity.save()
}

export function handleContractStart(event: ContractStart): void {
  let entity = HTLC.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new HTLC(event.transaction.from.toHex());
  }

  entity.id = event.params.contractId.toString();
  entity.publisher = event.params.publisher;
  entity.advertiser = event.params.advertiser;
  entity.tokenGroup = event.params.tokenGroup;
  entity.tokenId = event.params.tokenId;
  entity.amount = event.params.amount;
  entity.timelock = event.params.timelock;
  entity.refunded = false;
  entity.withdrawn = false;

  entity.save()
}

export function handleContractRefund(event: ContractRefund): void {
  let entity = HTLC.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new HTLC(event.transaction.from.toHex());
  }

  entity.id = event.params.contractId.toString();
  entity.refunded = true;

  entity.save()
}

export function handleContractWithdraw(event: ContractWithdraw): void {
  let entity = HTLC.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new HTLC(event.transaction.from.toHex());
  }

  entity.id = event.params.contractId.toString();
  entity.withdrawn = true;

  entity.save()
}

export function handleContractSetHashlock(event: ContractSetHashlock): void {
  let entity = HTLC.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new HTLC(event.transaction.from.toHex());
  }

  entity.id = event.params.contractId.toString();
  entity.hashlock = event.params.hashlock;
  entity.totalShares = event.params.totalShares;

  entity.save()
}

export function handleContractSetShare(event: ContractSetShare): void {
  let entity = HTLC.load(event.transaction.from.toHex());

  if (entity.shares === [] || entity.shares.length === 0) {
    entity.shares = [event.params.share];
  } else {
    entity.shares.push(event.params.share);
  }
}


