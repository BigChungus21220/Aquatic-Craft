import { world, ItemStack, Items } from '@minecraft/server'
import * as Language from 'texts/en_US_lang.js';
import { vec3 } from 'Vector.js';

world.events.dataDrivenEntityTriggerEvent.subscribe(bucketMob);

//hides a string with color codes
function hideString(str){
	let hiddenString = "";
	for (let i = 0; i < str.length; i++){
		let char = str[i];
		//preserve player made color codes
		if (char == "§"){
			char = "₽"
		}
		hiddenString += "§" + char;
	}
	return hiddenString;
}

//returns the string with color codes removed
function unhideString(str){
	return str.replaceAll("§", "").replaceAll("₽", "§");
}

//pickup
function bucketMob(entityEvent){
	if (entityEvent.id == "aqua:bucketed"){
		let entity = entityEvent.entity;
		//get player who placed mob
		let player;
		let players = world.getPlayers();
		for (let p of players) {
			if (p.hasTag("bucketer")) {
				player = p;
				break;
			}
		}
		player.removeTag("bucketer");
		//get entity data
		let identifier = entity.typeId;
		let name = entity.nameTag;
		let variant = entity.hasComponent("minecraft:variant") ? entity.getComponent("minecraft:variant").value : -1;
		let hasName = name != "";
		let isBaby = entity.hasComponent("minecraft:is_baby");
		//hide entity data with text formating codes
		let hiddenIdentifier = hideString(identifier);
		let hiddenName = hideString(name);
		let hiddenVariant = hideString(variant != -1 ? "" + variant : "");
		let hiddenIsBaby = hideString(isBaby ? 1 : 0);

		//create bucket
		let bucket = new ItemStack(Items.get("aqua:mob_bucket"), 1);
		bucket.setLore([
			(hasName ? name : "") + (isBaby && hasName ? ", ": "") + (isBaby ? "Baby" : ""),
			hiddenIdentifier,
			hiddenName,
			hiddenVariant,
			hiddenIsBaby
		]);

		const bucketRef = identifier + "_" + variant + "_bucket";
		let itemName = Language.entries[bucketRef];
		bucket.nameTag = "§r§f" + (Language.entries[bucketRef] != undefined ? itemName : bucketRef);
		//give player bucket
		player.getComponent("minecraft:inventory").container.addItem(bucket);
	}
}

//placement
world.events.itemUseOn.subscribe(releaseMob);

function releaseMob(releaseEvent){
	if (releaseEvent.item.typeId == "aqua:mob_bucket"){
		let player = releaseEvent.source;
		let dimension = player.dimension;
		//get direction as vector
		let direction = vec3(releaseEvent.blockFace);
		//set location to place mob and water
		let placePosition = vec3(releaseEvent.blockLocation).add(direction);
		//place water
		if (dimension.getBlock(placePosition.blockLocation).typeId == "minecraft:air") {
			dimension.runCommandAsync("setblock " + placePosition.commandPosition + " minecraft:flowing_water");
		}
		//get entity data
		let lore = releaseEvent.item.getLore();
		let identifier = unhideString(lore[1]);
		let name = unhideString(lore[2]);
		let variant = unhideString(lore[3]);
		//spawn entity
		let newEntity = dimension.spawnEntity(identifier, placePosition.add(0.5).location);
		if (lore[2] != ""){
			newEntity.nameTag = name;
		}
		if (lore[3] != ""){
			newEntity.triggerEvent("aqua:" + Number.parseInt(variant));
		}
		if (unhideString(lore[4]) == "1"){
			newEntity.triggerEvent("aqua:is_baby");
		} else {
			newEntity.triggerEvent("aqua:not_baby");
		}
		//play splash if in water
		let block = newEntity.dimension.getBlock(placePosition.blockLocation);
		if (block.typeId == "minecraft:water" || block.typeId == "minecraft:flowing_water") {
			dimension.runCommandAsync("playsound random.splash @a " + placePosition.commandPosition);
		}
	}
}