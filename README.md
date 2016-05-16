
# timer v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

The `setTimeout` replacement:

```coffee
timer = Timer 4000, ->
  console.log "Elapsed time: " + timer.elapsedTime
```

The `clearTimeout` replacement:

```
timer.prevent()
```
