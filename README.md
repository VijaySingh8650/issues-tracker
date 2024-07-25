1. Machine is active or not 
https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/isMachineActiveReq   **calling 3 times max** 10 seconds

2. If order is created
   /machineQueueCountReq    RequestBody: transactionId Response: recipeReceivedCount >3  then only I need to go to step 3
   Else I need to wait 

3. 