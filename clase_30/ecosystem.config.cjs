module.exports = {
  apps : [
    {
    name: "Server1",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8080
    },
    node_args:"--expose-gc"
  },
  {
    name: "Server2",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8081
    },
    node_args:"--expose-gc"
  },
  {
    name: "Server3",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8082
    },
    exec_mode:"cluster",
    instances:1,
    node_args:"--harmony --expose-gc"
  }
  ,
  {
    name: "Server4",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8083
    },
    exec_mode:"cluster",
    instances:1,
    node_args:"--harmony --expose-gc"
  }
  ,
  {
    name: "Server5",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8084
    },
    exec_mode:"cluster",
    instances:1,
    node_args:"--harmony --expose-gc"
  }
  ,
  {
    name: "Server6",
    script: "./app.js",
    watch: true,
    env:{
      PORT:8085
    },
    exec_mode:"cluster",
    instances:'max',
    node_args:"--harmony --expose-gc"
  }
]
}