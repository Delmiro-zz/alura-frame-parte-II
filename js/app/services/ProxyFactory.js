class ProxyFactory {

    static create(objeto, props, acao){

        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) &&  ProxyFactory._verificaSeEhFuncao(target[prop]) ) {
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                 }
             return Reflect.get(target, prop, receiver);
            }
        });
    }

    static _verificaSeEhFuncao(func){
        return typeof(func) == typeof(Function);
    }
}