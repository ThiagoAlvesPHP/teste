//
window.Mercadopago.setPublishableKey("TEST-f626b6f2-639c-4873-be8e-c2e262ac4ded");

window.Mercadopago.getIdentificationTypes();

$(function (){
	//evento para pegar número do cartão
	$(document).on('keyup', '#cardNumber', function(){
		var card = $(this).val();
		//se quantidade for igual ou maior que 6 envia a informação para função guessPaymentMethod
		if (card.length == 6) {
			guessPaymentMethod(card);
		}
		if (card.length < 6) {
			// limpar issuer installments paymentMethodId
			$("#issuer").empty();
			$("#installments").empty();
			$("#paymentMethodId").val("");
			$('#bandeira span img').remove();
		}
	});
	//Obtenha o método de pagamento do cartão
	function guessPaymentMethod(event) {
		//pega os 6 primeiros digitos de uma string
		let bin = event.substring(0,6);
		//envia a informação para um method do mercado pago e da o retorno no method setPaymentMethod
		window.Mercadopago.getPaymentMethod({
		   "bin": bin
		}, setPaymentMethod);
	};
	//bandeira
	function setPaymentMethod(status, response) {
		//se o status for 200 - positivo
		if (status == 200) {

			//salva a resposta 0 do array recebido
			let paymentMethod = response[0];
			//salva o id no input com id paymentMethodId
			document.getElementById('paymentMethodId').value = paymentMethod.id;
			//enviar bandeira para div
			$('#bandeira span').html('<img src="'+paymentMethod.secure_thumbnail+'">');
			//enviar id para o method getIssuers
			getIssuers(paymentMethod.id);
		} else {
			//resposta de erro caso não tenha nenhuma resposta da consulta
			alert(`payment method info error: ${response}`);
		}
	}
	//Obtenha a banco emissor
	function getIssuers(paymentMethodId) {
		//bandeira "paymentMethodId"
		window.Mercadopago.getIssuers(
			paymentMethodId,
			setIssuers
		);
	}
	function setIssuers(status, response) {
	   if (status == 200) {
	   		//pegando id dos bancos
			let issuerSelect = document.getElementById('issuer');

			response.forEach( issuer => {
				//criando option para select de bancos
			   let opt = document.createElement('option');
			   //inserindo nome do banco
			   opt.text = issuer.name;
			   //inserindo id de banco 
			   opt.value = issuer.id;
			   issuerSelect.appendChild(opt);
			});
			//enviando dados para classe getInstallments
			getInstallments(
			   document.getElementById('paymentMethodId').value,
			   document.getElementById('transactionAmount').value,
			   issuerSelect.value
			);
	   } else {
	       //alert(`Erro no banco emissor: ${response}`);
	   }
	}

	//Obtenha a quantidade de parcelas
	function getInstallments(paymentMethodId, transactionAmount, issuerId){
	   window.Mercadopago.getInstallments({
	       "payment_method_id": paymentMethodId,
	       "amount": parseFloat(transactionAmount),
	       "issuer_id": parseInt(issuerId)
	   }, setInstallments);
	}
	function setInstallments(status, response){
	   if (status == 200) {
	       document.getElementById('installments').options.length = 0;
	       response[0].payer_costs.forEach( payerCost => {
	           let opt = document.createElement('option');
	           opt.text = payerCost.recommended_message;
	           opt.value = payerCost.installments;
	           document.getElementById('installments').appendChild(opt);
	       });
	   } else {
	       //alert(`installments method info error: ${response}`);
	   }
	}

	//Crie o token do cartão
	doSubmit = false;
	document.getElementById('paymentForm').addEventListener('submit', getCardToken);
	function getCardToken(event){
	   event.preventDefault();
	   if(!doSubmit){
	       let $form = document.getElementById('paymentForm');
	       window.Mercadopago.createToken($form, setCardTokenAndPay);
	       return false;
	   }
	};
	function setCardTokenAndPay(status, response) {
	   if (status == 200 || status == 201) {
	       let form = document.getElementById('paymentForm');
	       let card = document.createElement('input');
	       card.setAttribute('name', 'token');
	       card.setAttribute('type', 'hidden');
	       card.setAttribute('value', response.id);
	       form.appendChild(card);
	       doSubmit=true;
	       form.submit();
	   } else {
	       //alert("Verify filled data!\n"+JSON.stringify(response, null, 4));
	       alert('Algum valor inserido no campos não esta correto');
	   }
	};

});