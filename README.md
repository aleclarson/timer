
# timer v2.0.2 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

The `setTimeout` replacement:

```coffee
timer = Timer 4000, ->
  console.log "Elapsed time: " + timer.elapsedTime
```

The `clearTimeout` replacement:

```
timer.prevent()
```
