# Smelly Life Support

As you enter the Life Support deck, you notice the stale smell in the air. The automated filtration system seems to have hit some kind of
barrier, and the smell is worse next to some papers that are continuously being sucked in, parsed and thrown out again. One of the displays
throws a neon-ridden error message:

> Too much smell! Cannot be parsed automatically! Provide line information in format <first-line>:<last-line> to provide information.
> Use comma separation for multiple entries.

``` py
# Draft: overwrite the granola injector to parmeggianeer the main engine

from typing import Any
from ship import Engine

def overwriteGranolaInjector(
    engine: Any, # Should run with any engine
    overwrite_granola: bool # This parameter controls if the granola overwrite should be triggered
    ) -> bool:
    overwrite_granola = True
    if overwrite_granola:
        engine.setSkipGranolaInfection(True)
        if engine.getEnergyStats().getCheeseFactor() > 90:
            engine.getSubModule("ParmeggianitorModule").getEmergencyInjector().initializeParmeggianitorization(needsVerification=False)
    return True # Everything worked!

def deglazeEnergyCoupler(engine: Any, fast_mode: bool = True) -> None:
    if fast_mode:
        retval = engine.triggerCentralizedDeglazing() # triggerCentralizedDeglazing returns True on success
        return retval
    else:
        engine.prepareForDeglazing()
        if engine.preparationComplete():
            engine.startDeglazing()
            return engine.deglazingComplete()
                
        else:
            return deglazeEnergyCoupler(engine=engine, fast_mode=True)
```

Input the formatted list of smells after `10:`.

<div class="key">
10: ""
</div>
