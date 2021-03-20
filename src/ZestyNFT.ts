import { ByteArray, store, crypto } from "@graphprotocol/graph-ts";
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
import { TokenData } from "../generated/schema";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBurn(event: Burn): void {
  let id = event.params.id.toString();
  store.remove("TokenData", id);
}

export function handleMint(event: Mint): void {
  let entity = new TokenData(event.params.id.toString());

  entity.id = event.params.id.toString();
  entity.tokenGroup = event.params.tokenGroup;
  entity.publisher = event.params.publisher;
  entity.owner = event.params.publisher;
  entity.timeCreated = event.params.timeCreated;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.uri = event.params.uri;
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleModifyToken(event: ModifyToken): void {
  let entity = new TokenData(event.params.id.toString());

  entity.tokenGroup = event.params.tokenGroup;
  entity.publisher = event.params.publisher;
  entity.timeCreated = event.params.timeCreated;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.uri = event.params.uri;
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  let entity = new TokenData(event.params.tokenId.toString());
  entity.owner = event.params.to;

  entity.save();
}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}