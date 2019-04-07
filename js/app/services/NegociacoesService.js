class NegociacoesService{

    constructor(){
        this._httpService = new HttpService();
    }

    obterNegociacoesDaSemana(){

        return new Promise((resolve, reject)=>{

            this._httpService.get('negociacoes/semana').
            then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro=>{
                console.log(erro);
                reject('Erro ao obter o serviço negociações da semana.');
            });
        })            
    }

    
    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject)=>{

            this._httpService.get('negociacoes/anterior').
            then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro=>{
                console.log(erro);
                reject('Erro ao obter o serviço negociações da semana anterior.');
            });
        })     
    }

    
    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject)=>{

            this._httpService.get('negociacoes/retrasada').
            then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }).catch(erro=>{
                console.log(erro);
                reject('Erro ao obter o serviço negociações da semana retrasada.');
            });
        })     
    }

}