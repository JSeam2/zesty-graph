import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  ZestyNFT,
  Approval,
  ApprovalForAll,
  Burn,
  Mint,
  ModifyToken,
  OwnershipTransferred,
  Paused,
  Transfer,
  Unpaused
} from "../generated/ZestyNFT/ZestyNFT";
import { AdData } from "../generated/schema";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurn(event: Burn): void {
  let id = event.params.id.toString();
  store.remove("ZestyNFTEntity", id);
}

export function handleMint(event: Mint): void {
  let entity = AdData.load(event.transaction.from.toHex());

  if (entity == null) {
    entity = new AdData(event.transaction.from.toHex());
  }

  entity.id = event.params.id.toString();
  entity.tokenGroup = event.params.tokenGroup;
  entity.publisher = event.params.publisher;
  entity.timeCreated = event.params.timeCreated;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.location = event.params.location;
  entity.uri = event.params.uri;
  entity.timeModified = event.params.timeModified;

  entity.save();
}

export function handleModifyToken(event: ModifyToken): void {
  let entity = AdData.load(event.params.id.toString());

  entity.tokenGroup = event.params.tokenGroup;
  entity.publisher = event.params.publisher;
  entity.timeCreated = event.params.timeCreated;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.location = event.params.location;
  entity.uri = event.params.uri;
  entity.timeModified = event.params.timeModified;

  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}
