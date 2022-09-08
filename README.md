# Quest for coffee (Hacktoberfest 2022)

This is the source for the virtual puzzle space for the Hacktoberfest 2022 event.
The playground is a [workadventure space](https://play.workadventu.re/_/global/poeschl.github.io/space-riddles/map/Space-Riddles.json)

In this room every participant will find questions/quests in several rooms.
Every solved task will open a door in the virtual space to new questsions.

Your answers will be entered into the `solutions.yaml` file and pushed via Pull Requests.

**While playing interaction with the `valid-solutions.yaml` file and the `riddles` folder is not allowed.**

## Setup Instructions

### Add new riddles

* To add new riddles, add a new riddle markdown file in the `riddles` folder.
* Add the valid answer in the `valid-solutions.yaml` file (decoding/encoding scripts in the `scripts` folder).
* Add a new room with [Tiled](https://www.mapeditor.org/) in the space inside the `map` folder
* Add the question area around a "question crystal" (see existing layers)
* Add a door (look at existing layers)
