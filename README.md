# Tanya Degurechaff

<h2>nota pessoal</h2>
Fiz o bot porque queria práticar um pouco javascript, o que foi um sucesso. Tive a oportunidade de aprender bastante no caminho, usar os recursos avançados da ultima versão do ECMAScript e tambem um banco de dados relacional na pratica (tive bastante trabalho no inicio, mas apesar de não ficar perfeito estar funcional). O resultado ficou excelente na parte mecanica para o cliente(s), no codigo eu preferiria usar o typescript, isso teria me feito evitar muita dor de cabeça na codificação. Consegui contornar muitos cenarios provaveis de incongruências e deixar o bot adaptável a quem/quantos forem utilizar seus serviços. O VPS que uso não é um dos melhores no momento, então recomendo usar na sua maquina para evitar erros de conexão, a depedencias estão no arquivo package (entao é só usar npm install) e configurar o banco de dados mysql.

<h2> comandos reply</h2>
<p>Para iniciar, finalizar ou ver o status de algum suporte você deve responder (reply) a mensagem inicial da solicitação de suporte ou responder uma mensagem que termina a  cadeia de reply nessa mensagem inicial. Os comandos de reply não são case-sensitive e não poderão ser enviadas para o usuario, devem ser literais sem quaisquer outras palavras a mais. Você não pode iniciar um suporte a partir de uma thread (sub-canal), assim como não pode iniciar um suporte que estiver em andamento por outra pessoa, contudo, nesse caso, disponibilizado as alternativas **INICIAR** **FINALIZAR** que forçam o encerramento ou o inicio do suporte sem quaisquer limitações de disponibilidade.</P> 
<ol><li><strong>iniciar</strong></li><p>para abrir uma thread e então você poder responder as mensagens, que só podem ser respondidas atraves de threads (sub-canais).</p><li><strong>finalizar</strong></li><p>para encerrar o suporte tanto para o usuario quanto para guilda, tornando inviavel a obtenção ou envio de mensagem por ambas as aprte.</p> <li><strong>status</strong></li><p>para poder ver se o usuario estar aguardando alguem iniciar seu suporte, ou se alguem já estar a cargo disso.</p></ol>

![comando reply iniciar](https://github.com/jaironeto/Tanya-Degurechaff/blob/main/Screenshot_1.png)

<h2> comando de configurações</h2>
<p>Assim que o bot entra em uma guilda ele de imediato cadastra todos os usuario no banco de dados para funcionar assim que possivel, e então a cada 1 hora ele vasculha as guilda, em todos os canais possiveis, atrás da ultima mensagem enviada do usuario e qual guilda foi enviada, para quando ele solicitar suporte lhe aparecer primeiro os servidores que é mais ativo, ou pelo menos interagiu por ultimo. Contudo, para guilda entrar na lista ela deve primeiro configurar adequadamente com os comandos de barra listado na imagem a baixo, em essencial se deseja ativar ou não o suporte por privado, já que o restante tem padroes pre-disposto.</p>
<p>Uma observação importante a se fazer e que qualquer um pode responder as mensagens, mas nem todos podem configurar o servidor, por isso cuidado na hora de escolher o canal. Outra coisa e que os canais de opções, ou até mesmo o padrão (quando não tem opção) e cadastrado a partir de onde o comando foi enviado, sempre atualizado quando o comando for feito.</p>
<p>As mensagens, imagens e opções são personalizaveis.</p> 

![comandos de configurações](https://github.com/jaironeto/Tanya-Degurechaff/blob/main/Screenshot_2.png)

<h2> opções de servidores dinamico</h2>
<p>O usuario que solicitar suporte não ira ver todos os servidores cadastrado, apenas aqueles que ele faz parte (estar cadastrado no banco de dados) e que foram devidamente configurados, então se ele só estiver no seu servidor apenas mostrara o seu, assim como se estiver em outros, obviamente mostrara os outros, mas em ordem de em qual servidor ele interagiu por ultimo.</p>
