
export class ItemDTO {
   public versionSource:string=undefined;
   public version:string=undefined;

    public key: string=undefined;
    public createdAt: number=undefined;
    public active: boolean=undefined;
    // public data: Buffer=undefined;
    public headers: { key: string; value: string }[]=undefined;
    /**
     * metodo statico utilizzato per recuperare l'id dell'entita.
     * @param item
     */
    static selectId: (item: ItemDTO) => string = item => item.key;
}
