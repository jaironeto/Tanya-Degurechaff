# Tanya Degurechaff

<h2>nota pessoal</h2>
Fiz o bot porque queria práticar um pouco javascript, o que foi um sucesso. Tive a oportunidade de aprender bastante no caminho, usar os recursos avançados da ultima versão do ECMAScript e tambem um banco de dados relacional na pratica (tive bastante trabalho no inicio, mas apesar de não ficar perfeito estar funcional). O resultado ficou excelente na parte mecanica para o cliente(s), no codigo eu preferiria usar o typescript, isso teria me feito evitar muita dor de cabeça na codificação. Consegui contornar muitos cenarios provaveis de incongruências e deixar o bot adaptável a quem/quantos forem utilizar seus serviços. O VPS que uso não é um dos melhores no momento, então recomendo usar na sua maquina para evitar erros de conexão, a depedencias estão no arquivo package (entao é só usar npm install) e configurar o banco de dados mysql.

<h2> comandos reply</h2>
<p>Para iniciar, finalizar ou ver o status de algum suporte você deve responder (reply) a mensagem inicial da solicitação de suporte ou responder uma mensagem que termina a  cadeia de reply nessa mensagem inicial. Os comandos de reply não são case-sensitive e não poderão ser enviadas para o usuario, devem ser literais sem quaisquer outras palavras a mais. Você não pode iniciar um suporte a partir de uma thread (sub-canal), assim como não pode iniciar um suporte que estiver em andamento por outra pessoa, contudo, nesse caso, disponibilizado as alternativas **INICIAR** **FINALIZAR** que forçam o encerramento ou o inicio do suporte sem quaisquer limitações de disponibilidade.</P> 
<ol><li><strong>iniciar</strong></li><p>para abrir uma thread e então você poder responder as mensagens, que só podem ser respondidas atraves de threads (sub-canais).</p><li><strong>finalizar</strong></li><p>para encerrar o suporte tanto para o usuario quanto para guilda, tornando inviavel a obtenção ou envio de mensagem por ambas as aprte.</p> <li><strong>status</strong></li><p>para poder ver se o usuario estar aguardando alguem iniciar seu suporte, ou se alguem já estar a cargo disso.</p></ol>

![comando reply iniciar](https://github.com/jaironeto/Tanya-Degurechaff/blob/main/Screenshot_1.png)

<h2> comando de configurações</h2>

