export function hasOwnProperty(target:object, v:PropertyKey){
    return Object.prototype.hasOwnProperty.call(target,v)
}
