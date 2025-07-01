import { v4 } from "uuid";

export class IngresoEgreso {
    constructor(
        public description: string,
        public quantity: number,
        public type: string,
        public email?: string,
        public uid?: string
    ){
        if(!this.uid){
            this.uid = v4()
        }
    }
}