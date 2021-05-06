import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  StreamGame_ETH,
  GameStateNew,
  GameStateUpdate,
  GameStateWithdraw
} from "../generated/StreamGame_ETH/StreamGame_ETH";
import { StreamGame } from "../generated/schema";

export function handleGameStateNew(event: GameStateNew): void {
  let entity = new StreamGame(event.params.gameId.toString());

  entity.id = event.params.gameId.toString();
  entity.creator = event.params.creator;
  entity.currentDonor = new Bytes(0);
  entity.currentMessage = "";
  entity.currentDonation = new BigInt(0);
  entity.totalDonations = new BigInt(0);
  entity.timestamp = event.params.timestamp;

  entity.save();
}

export function handleGameStateUpdate(event: GameStateUpdate): void {
  let entity = StreamGame.load(event.params.gameId.toString());

  if (entity !== null) {
    entity.currentDonor = event.params.currentDonor;
    entity.currentMessage = event.params.currentMessage;
    entity.totalDonations = event.params.totalDonations;
    entity.currentDonation = event.params.totalDonations.minus(<BigInt>entity.totalDonations);
    entity.timestamp = event.params.timestamp;

    entity.save();
  }
}

export function handleGameStateWithdraw(event: GameStateWithdraw): void {
  let entity = new StreamGame(event.params.gameId.toString());

  entity.creator = event.params.creator;
  entity.currentDonor = new Bytes(0);
  entity.currentMessage = "";
  entity.currentDonation = new BigInt(0);
  entity.totalDonations = new BigInt(0);
  entity.timestamp = event.params.timestamp;

  entity.save();

}
