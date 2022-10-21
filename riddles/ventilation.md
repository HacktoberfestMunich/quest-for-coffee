# Smelly Life Support

As you enter the Life Support deck, you notice the stale smell in the air. The automated filtration system seems to have hit some kind of
barrier, and the smell is worse next to some papers that are continuously being sucked in, parsed and thrown out again. One of the displays
throws a neon-ridden error message:

> Too much smell! Cannot be parsed automatically! Provide line indices to mark smelly sources.
> Use comma separation for multiple entries.

``` py
 0 # Draft: overwrite the granola injector to parmeggianeer the main engine
 1 
 2 from typing import Any
 3 from ship import Engine
 4 
 5 def overwriteGranolaInjector(
 6     engine: Any, # Should run with any engine
 7     overwrite_granola: bool # This parameter controls if the granola overwrite should be triggered
 8     ) -> bool:
 9     overwrite_granola = True
10    if overwrite_granola:
11         engine.setSkipGranolaInfection(True)
12         if engine.getEnergyStats().getCheeseFactor() > 90:
13             engine.getSubModule("ParmeggianitorModule").getEmergencyInjector().initializeParmeggianitorization(needsVerification=False)
14     return True # Everything worked!
15 
16 def deglazeEnergyCoupler(engine: Any, fast_mode: bool = True) -> None:
17     if fast_mode:
18         retval = engine.triggerCentralizedDeglazing() # triggerCentralizedDeglazing returns True on success
19         return retval
20     else:
21         engine.prepareForDeglazing()
22         if engine.preparationComplete():
23             engine.startDeglazing()
24             return engine.deglazingComplete()
25                 
26         else:
27             return deglazeEnergyCoupler(engine=engine, fast_mode=True)
```

Assist the system by adding a smelly line index after `11:`.

<div class="key">
11: ""
</div>
