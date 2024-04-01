/*
    Better Vectors by Bigchungus21220

    Provides vector operations and conversions for gametest.

    Useage:
        to use in your script:
            import { vec3 } from 'scripts/Vector.js'; 

        Convert to vector:
            vec3() = zero vector
            vec3(string) = direction (up, down, east, west, north, south)
            vec3(number) = a vector where all components are the input number
            vec3(object) = converts an object that looks like {x:, y: z:} to a vector
            vec3(number,number,number) = a vector with components x, y, and z

        Convert to other formats:
            blockLocation = returns the vector as a BlockLocation
            location = returns the vector as a Location
            commandPosition = returns the vector as a position to be used in a command 
                (eg: x + " " + y + " " + z)

        Normal operations:
            Vec3.add(vector) = adds two vectors
            Vec3.add(number) = adds a number to a vector
            Vec3.subtract(vector) = sutracts a vector from this vector
            Vec3.subtract(number) = sutracts a number from this vector
            Vec3.multiply(vector) = multiplies two vectors
            Vec3.multiply(number) = multiplies a vector by a number
            Vec3.divide(vector) = divides this vector by another vector
            Vec3.divide(number) = divides this vector by a number

        Vector operations:
            Vec3.dot(vector) = finds the dot product of two vectors
            Vec3.cross(vector) = finds the cross product of two vectors
            Vec3.length = gets the length of a vector
            Vec3.normalized = gets the vector but with a length of one
*/

import { BlockLocation, Location, Vector } from '@minecraft/server'
export { vec3 };

//example useage
function VectorsExample(){
    let myVector = vec3(1,2,3).add(vec3(0.5));
    let myLength = myVector.length;
    let myBlockLocation = myVector.blockLocation;
    return myBlockLocation.x + myLength;
}

function vec3(a,b,c){
    if (a === undefined) {
        return new Vec3();
    } else if (b === undefined) {
        let type = typeof a;
        if (type == "string"){
            const lookup = {
                up: vec3(0,1,0),
                down: vec3(0,-1,0),
                east: vec3(1,0,0),
                west: vec3(-1,0,0),
                north: vec3(0,0,-1),
                south: vec3(0,0,1)
            };
            return lookup[a];
        } else if (type == "number") {
            return new Vec3(a,a,a);
        } else {
            return vec3(a.x,a.y,a.z);
        }
    } else {
        return new Vec3(a,b,c);
    }
}

class Vec3 {
    x = 0;
    y = 0;
    z = 0;

    constructor(x,y,z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    get blockLocation(){
        return new BlockLocation(this.x,this.y,this.z);
    }

    get location(){
        return new Location(this.x,this.y,this.z);
    }

    get mcVector(){
        return new Vector(this.x,this.y,this.z);
    }

    get commandPosition(){
        return this.x + " " + this.y + " " + this.z
    }

    add(a){
        if (typeof a == "number"){
            return vec3(this.x + a, this.y + a, this.z + a);
        } else {
            return vec3(this.x + a.x, this.y + a.y, this.z + a.z);
        }
    }

    subtract(a){
        if (typeof a == "number"){
            return vec3(this.x - a, this.y - a, this.z - a);
        } else {
            return vec3(this.x - a.x, this.y - a.y, this.z - a.z);
        }
    }

    multiply(a){
        if (typeof a == "number"){
            return vec3(this.x * a, this.y * a, this.z * a);
        } else {
            return vec3(this.x * a.x, this.y * a.y, this.z * a.z);
        }
    }

    divide(a){
        if (typeof a == "number"){
            return vec3(this.x / a, this.y / a, this.z / a);
        } else {
            return vec3(this.x / a.x, this.y / a.y, this.z / a.z);
        }
    }

    dot(vector){
        return this.x*vector.x + this.y*vector.y + this.z*vector.z;
    }

    cross(vector){
        return vec3(
            this.y*vector.z - this.z*vector.y,
            this.z*vector.x - this.x*vector.z,
            this.x*vector.y - this.y*vector.x
        );
    }

    get length(){
        return sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }

    get normalized(){
        return this.divide(this.length);
    }
}
