class ListaNegociacoes {
    
    constructor(contexto, armadilha) {
        
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }
    
    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
        Reflect.apply(this._armadilha,this._contexto, [this]);
        // this._armadilha(this);
    }
    
    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    limpa(){
        this._negociacoes = [];
        //this._armadilha(this);
        Reflect.apply(this._armadilha,this._contexto,[this]);
    }
}