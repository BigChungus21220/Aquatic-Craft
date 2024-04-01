import { world } from "@minecraft/server";

//placement
world.events.beforeItemUseOn.subscribe(waterlogBlock);

function waterlogBlock(placeEvent) {
	if (placeEvent.item.id == "minecraft:water_bucket"){
		let block = placeEvent.source.dimension.getBlock(placeEvent.blockLocation);
		if (block.permutation.hasTag("aqua:waterloggable")) {
			placeEvent.cancel = true;
			block.isWaterlogged = true;
		}
	}
}