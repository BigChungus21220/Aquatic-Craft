import { MinecraftBlockTypes, world, Vector, BlockLocation } from "@minecraft/server";

//placement
/*world.events.itemUseOn.subscribe(rotateBlock);

function rotateBlock(placeEvent){
	if (placeEvent.item.id == "aqua:coconut_item"){
		let player = placeEvent.source;
		let item = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);
		let dimension = player.dimension;
		let direction;
		if (placeEvent.blockFace == 0) {
			direction = new Vector(0, -1, 0);
		} else if (placeEvent.blockFace == 1) {
			direction = new Vector(0, 1, 0);
		} else if (placeEvent.blockFace == 2) {
			direction = new Vector(0, 0, -1);
		} else if (placeEvent.blockFace == 3) {
			direction = new Vector(0, 0, 1);
		} else if (placeEvent.blockFace == 4) {
			direction = new Vector(-1, 0, 0);
		} else {
			direction = new Vector(1, 0, 0);
		}
		//set location to place mob and water
		let placePosition = new BlockLocation(
			placeEvent.blockLocation.x + direction.x, 
			placeEvent.blockLocation.y + direction.y, 
			placeEvent.blockLocation.z + direction.z
		);

		let block = dimension.getBlock(placePosition);
		const type = MinecraftBlockTypes.get("aqua:coconut");
		block.setType(type);

		const perm = block.permutation;
		const rotation = perm.getProperty("aqua:rotation");
		rotation.value = direction;
		block.setPermutation(perm);

		//dimension.runCommand("setblock " + placePosition.x + " " + placePosition.y + " " + placePosition.z + " aqua:coconut_block [\"rotation\":" + placeEvent.blockFace + "]");
		dimension.runCommand("say coconut placed, item: " + item.id);
	}
}*/