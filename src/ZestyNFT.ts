import { ByteArray, store, crypto } from "@graphprotocol/graph-ts";
import {
  ZestyNFT,
  Approval,
  ApprovalForAll,
  Burn,
  Mint,
  ModifyToken,
  SetTokenGroupURI,
  OwnershipTransferred,
  Paused,
  Transfer,
  Unpaused
} from "../generated/ZestyNFT/ZestyNFT";
import { TokenData, TokenGroup } from "../generated/schema";

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
  entity.timeCreated = event.params.timeCreated;
  entity.timeStart = event.params.timeStart;
  entity.timeEnd = event.params.timeEnd;
  entity.location = event.params.location;
  entity.uri = event.params.uri;
  entity.timeModified = event.params.timeModified;

  entity.save();
}

export function handleModifyToken(event: ModifyToken): void {
  let entity = new TokenData(event.params.id.toString());

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

export function handleSetTokenGroupURI(event: SetTokenGroupURI): void {
  let tokenGroupHex = event.params.tokenGroup.toHexString();
  let tokenGroupBA = ByteArray.fromHexString(tokenGroupHex);
  let hashId = crypto.keccak256(concat(event.params.publisher, tokenGroupBA)).toHexString();

  let entity = new TokenGroup(hashId);

  entity.id = hashId;
  entity.tokenGroup = event.params.tokenGroup;
  entity.publisher = event.params.publisher;
  entity.tokenGroupURI = event.params.tokenGroupURI;
  
  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}


// Helper for concatenating two byte arrays
// Code obtained from @graphprotocol/graph-ts/helper-functions.ts
function concat(a: ByteArray, b: ByteArray): ByteArray {
  let out = new Uint8Array(a.length + b.length)
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i]
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j]
  }
  return out as ByteArray
}