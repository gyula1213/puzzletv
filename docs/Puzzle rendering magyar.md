# Puzzle megjelenítése

A Puzzle TV olyan rejtvényeket képes megjeleníteni, amelyek valamilyen rácsot alkotnak – polygonális cellák halmazát.
A rejtvény megoldása általában a cellákkal való interakciót jelenti: adat beírását (általában számjegyek, de nem feltétlenül), színezést, vonalak rajzolását a cellaközéppontok és a cellahatárok mentén.

A rejtvényoldal elrendezése egy rejtvényrács területből és egy oldalsávból áll, ahol a szabályok és a vezérlők jelennek meg.

A [`Puzzle`](../src/components/puzzle/puzzle/Puzzle.tsx) komponens inicializálja a "rejtvény-konténer" állapotot (kezeli a megoldás állapotát), kiszámítja a rács területének és az oldalsáv helyzetét, majd megjeleníti a releváns összetevőket.
A [`Grid`](../src/components/puzzle/grid/Grid.tsx) komponens jeleníti meg a rejtvényrácsot, a [`SidePanel`](../src/components/puzzle/side-panel/SidePanel.tsx) komponens pedig az oldalsávot.
Ez a cikk a rács megjelenítését tárgyalja, beleértve:

- Cellahatárokat.
- Cellatartalmakat (számjegyek, színek, ceruzajelölések).
- Korlátok jelzéseit.
- Toll eszközzel rajzolt vonalakat.
- Egyéb interaktív elemeket.

## DOM rétegek és pozícionálás

A rács nagy részét SVG-ként rendereli a rendszer.
De vannak nem-SVG rétegek, amelyek előtte vannak, és a elrendezést illetve testreszabást segítik.

### Nem-SVG rétegek

A rács külső rétege egy abszolút pozícionált wrapper div, amely a rejtvény rácsterületének teljes négyzetét elfoglalja.
Megjegyzés: a rács konténere mindig négyzet alakú (még ha maga a rejtvény téglalap alakú is), hogy az elrendezés állandó legyen, és a tartalomkészítőknek ne kelljen minden rejtvényhez új OBS-jelenetet definiálni.
A legfelső wrapper div továbbá elfogja az olyan egérgesztusokat, amelyek az egész rácsra hatnak (például panning/zoomolás).

A következő réteg a rács wrapper alatt egy opcionális `GridWrapper` komponens, amelyet a [típuskezelő szintjén](./Data%20structures%20and%20types.md) a `gridWrapperComponent` mezőben lehet definiálni.
Alapértelmezésben egy áteresztő komponens, ami a gyermekeit változtatás nélkül jeleníti meg, de a rejtvények felülírhatják, hogy egy egyedi wrapper divet használjanak és megváltoztassák a DOM szerkezetet.
Példák:

- Az [Elephant slitherlink](../src/data/puzzles/Slitherlink.tsx) rejtvény egy egyedi wrapperrel háttérképet ad a rács mögé.
- Az [Africa](../src/data/puzzles/Africa.tsx) rejtvény a rácsot a Google Maps rétegében jeleníti meg.

A `GridWrapper` mellett ott van egy további opcionális komponens, amelyet a [típuskezelő](./Data%20structures%20and%20types.md) adhat meg: a `GridControls`, a `gridControlsComponent` mezőben.
Ennek a komponensnek az a célja, hogy olyan rejtvény-specifikus vezérlőgombokat jelenítsen meg, amelyek nem egy adott cellához tartoznak, hanem az egész rácsra vonatkoznak.
Példák:

- A [forgatható kocka](../src/puzzleTypes/cube/components/FullCubeControls.tsx) rejtvény forgatógombokat használ a rácson kívül.
- Az [Infinite ring](../src/puzzleTypes/infinite-rings/components/InfiniteRingsGridControls.tsx) típuskezelő vastag rácsvonalakat és nagyításvezérlőket jelenít meg a rács közepén.

A rács wrapperen belül a következő réteg egy abszolút pozícionált, esetleg forgatott és nagyított div, amely a panning, forgatás és zoom hatásait alkalmazza a rácsra (ha van ilyen).
De lehetséges ezen automatikus pan- és nagyítási hatások egy részének kikapcsolása a `gridFitsWrapper` és `gridWrapperHandlesScale` zászlók használatával a típuskezelőn.
Ez lehetővé teszi, hogy a panningot és a nagyítást saját magad kezeld a wrapper komponensben, vagy egyedi transzformációkat alkalmazz a rácsra a `getRegionsWithSameCoordsTransformation()` és `transformCoords()` metódusok használatával.
Például:

- A [Google Maps típuskezelő](../src/puzzleTypes/google-maps/types/GoogleMapsTypeManager.ts) engedélyezi a `gridFitsWrapper`-t, mert a panningot és a zoomot a Google Maps widget kezeli.
- Az [Infinite rings típuskezelő](../src/puzzleTypes/infinite-rings/types/InfiniteRingsTypeManager.ts) engedélyezi a `gridWrapperHandlesScale`-t, mert a zoomot a gyűrűrégiók egyedi transzformációi kezelik.

A következő réteg a rács wrapperen belül az SVG címke közvetlen gyermeke, amely tartalmazza a rács alakzatok nagy részét és kezeli a cellákkal való interakciókat.

#### Fő SVG címke

A fő SVG címkét a [`GridSvg`](../src/components/puzzle/grid/GridSvg.tsx) komponens jeleníti meg.

Alapértelmezésben úgy pozícionálják és transzformálják, hogy az SVG koordináta-rendszere a rács bal felső sarkában kezdődjön, a margók nélkül (azaz a rács első cellájának bal felső sarkában), és a cella 1x1 négyzet legyen (hacsak nem alkalmaznak egyedi cellahatárokat).
Ezt az SVG koordináta-rendszer újradefiniálását le lehet állítani, ha a `PuzzleTypeManager.gridFitsWrapper` zászlót engedélyezed.

Alapértelmezés szerint a rejtvényt a négyzetes rács közepére helyezik a `PuzzleDefinition.gridSize` értékei szerint.
Ez logikus olyan rejtvényeknél, ahol a rács szabályos téglalap és az 1x1 négyzet cellákból áll.
Ilyen rejtvényeknél a `PuzzleDefinition.gridSize.gridSize` értékének a `PuzzleDefinition.gridSize.rowsCount` és `PuzzleDefinition.gridSize.columnsCount` maximális értékének kell lennie, és a kétdimenziós tömbben lévő cellaindexek közvetlenül megfelelnek az SVG koordinátáknak.
Azonban az egyedi cellahatárokkal és/vagy rácstranszformációkkal rendelkező rácsok esetén a cellaindexek nem feltétlenül kapcsolódnak közvetlenül az SVG koordinátákhoz, ezért az automatikus középre igazítás nem mindig értelmezhető.
Ezekben az esetekben az automatikus középre igazítást ki lehet kapcsolni a `PuzzleTypeManager.ignoreRowsColumnCountInTheWrapper` zászlóval, és az SVG koordináta-rendszer alapja a rács területének bal felső sarkában lesz.

#### Koordináta-transzformációs régiók

A rács UI testreszabásának egyik módja az, hogy több téglalap alakú régióra osztod a rácsot, és minden régióhoz külön koordináta-transzformációt alkalmazol (eltolás, méretezés, forgatás, ferde torzítás).

Ezeket a régiókat és transzformációkat úgy lehet definiálni, hogy a típuskezelőn implementálod a `getRegionsWithSameCoordsTransformation()` és `transformCoords()` metódusokat:

- A `getRegionsWithSameCoordsTransformation()` visszaadja a régiók listáját – téglalapokat vagy cellákból álló forráscsoportokat.
- A `transformCoords()` a forrás koordinátákat átalakított koordinátákká alakítja.
Fontos, hogy ez lineáris transzformáció legyen: `(x, y) -> (ax + by + c, dx + ey + f)`.

Lehetőség van arra is, hogy minden régión belül definiáld a `transformCoords()` propot, és a `transformCoordsByRegions()` segédfüggvényt használd a típuskezelő `transformCoords()` metódusának megvalósításához.

A `GridRegionsWithSameCoordsTransformation` komponens rendereli ezeket a régiókat, és közvetlen gyermeke a `GridSvg`-nek.
A komponens végigmegy a régiókon, és a rács teljes tartalmát mindegyik régióba rendereli, SVG clippinget használva, hogy elrejtse azokat a részeket, amelyek kívül esnek a régiókon.

De vannak esetek, amikor szükség van a clipping kikapcsolására, és valamit a régiókon kívül kell megjeleníteni, például JSS nyomoknál.
Ilyenkor a korlátnak speciális `noClip` réteget kell használni, amit a régiókon kívül rajzolnak, és a constraint felelős azért, hogy ellenőrizze a renderelés kontextusát és csak a megfelelő régióhoz tartozó grafikát jelenítse meg.
Lásd a [`Jss`](../src/puzzleTypes/jss/constraints/Jss.tsx) használati példáját.

A `GridRegionsWithSameCoordsTransformation` komponens két koordináta-transzformációt alkalmaz a tartalmakra:

1. Először alkalmazza a `transformCoords()` metódus által meghatározott transzformációt, így a koordinátarendszer alapja a transzformált régió bal felső sarkába kerül.
2. Ezután visszafelé eltolást alkalmaz a forrás régió bal felső sarka szerint, így a régió bal felső sarka ugyanazokkal a koordinátákkal rendelkezik, mint a transzformáció előtt.

Ezzel a transzformáció átlátszó marad azok számára a komponensek számára, amelyek renderelik a grafikát – úgy dolgozhatnak, mintha nem lenne transzformáció.

#### Rácsrétegek

Minden transzformációs régión belül a rács tartalma több rétegben jelenik meg – lásd a [`GridLayer`](../src/types/puzzle/GridLayer.ts) enumot.
Ezek a rétegek szabályozzák, mi jelenik meg mögött és mi jelenik meg előtérben (az SVG-ben sajnos nincs `z-index` CSS tulajdonság).

A legjobb módja annak, hogy megtudd, mely rétegeket támogatja a rendszer és milyen sorrendben kerülnek renderelésre, az a [`Grid`](../src/components/puzzle/grid/Grid.tsx) komponens forrásának megtekintése.

A legtöbb réteg a korlátok vizuális jeleit rendereli, amelyeket a [`Constraint.component`](../src/types/puzzle/Constraint.ts) mező határoz meg.
A többi réteg a cellák tartalmát rendereli: háttér, számjegyek, kijelölés, toll eszköz jelölések.
A legfelső rétegek az interaktív elemeket renderelik, amelyeket a felhasználó kattinthat vagy húzhat.

Nézzük meg részletesebben az egyes területeket.

##### Korlátok renderelése

Minden vizuális korlát meghatározza a [`component`](../src/types/puzzle/Constraint.ts) mezőt, amely egy React komponens-készlet a [grid rétegekhez](../src/types/puzzle/GridLayer.ts).
Minden réteghez a `Grid` komponens összegyűjti azokat a korlátokat, amelyek rendelkeznek a réteghez tartozó map-pel, és egyenként rendereli őket.

A komponenseknek átadott tulajdonságok a [`ConstraintProps`](../src/types/puzzle/Constraint.ts) típusban vannak definiálva, és tartalmazzák:

- A renderelendő korlát objektumának összes mezőjét.
- [Rejtvény-konténer](./Data%20structures%20and%20types.md) objektumot.
- A renderelt régió objektumát és indexét (lásd a "Koordináta-transzformációs régiók" szakaszt).

Tehát a komponens általában a korlát objektum mezőiből kapja a koordinátákat és a stílust, míg a rejtvény megoldási állapotából a dinamikus tartalmakat.

A legtöbb grid réteg figyelmen kívül hagyja a pointer eseményeket, ezért az interaktív elemeket a [`interactive` grid rétegben](../src/types/puzzle/GridLayer.ts) kell renderelni.

Alapértelmezés szerint a korlát React komponense felelős azért, hogy támogassa az egyedi cellahatárokat (nem négyzetrács cellákat véletlenszerű pozícióban).
Azonban ha a korlát csak egyetlen cella közepén, vagy két szomszédos cella közötti határon jelenik meg, engedélyezheti a `renderSingleCellInUserArea` zászlót.
Ha ez be van kapcsolva, az egységes cella korlátokat automatikusan a cella felhasználói területén renderelik a [`SingleCellGridItemPositionFix`](../src/components/puzzle/grid/SingleCellGridItemPositionFix.tsx) wrapper segítségével, és a kétcellás ("domino") korlátokat a két cella között.
Mind az egycellás, mind a kétcellás korlátok esetén a platform gondoskodik arról, hogy az összes koordináta-transzformáció (eltolás, nagyítás, forgatás) helyesen legyen alkalmazva, így a komponens úgy dolgozhat, mintha normál 1x1 cella lenne.

##### Rácscellák renderelése

A Puzzle TV két cellatípust támogat:

1. Szabályos cellák – minden cella 1x1 négyzet, amelyet a kétdimenziós cellatömb indexei határoznak meg. Ez az alapértelmezett mód.
2. Egyedi határokkal rendelkező cellák – minden cella egy sokszög, amelynek koordinátáit a `customCellBounds` mezőben adod meg a [puzzle definíció](../src/types/puzzle/PuzzleDefinition.ts) objektumban.
A [`CustomCellBounds`](../src/types/puzzle/CustomCellBounds.ts) objektum nemcsak a cellahatár poligont definiálja, hanem a cellán belüli "felhasználói területet" is – egy téglalapot (általában négyzetet), ahol a számjegyeket és a ceruzajelöléseket meg lehet jeleníteni.
A felhasználói területnek teljesen a cella poligonon belül kell lennie.
Ugyanaz a téglalap szolgál az egycellás korlátjelek renderelésére is.

Megjegyzés: egy szabályos cella felhasználói területe maga a teljes cella.

A `Grid` komponens a [`GridCellsLayer`](../src/components/puzzle/grid/GridCellsLayer.tsx) komponenst használja a cellák bejárásához és rendereléséhez.
A komponensnek több feltétele van a cellák kihagyására: kihagyja azokat a cellákat, amelyek nem tartoznak a jelenleg renderelt régióhoz, illetve azokat, amelyek kimentek a nézőablakból a panning miatt.

A cellatartalom-renderelők leginkább a [`GridCellShape`](../src/components/puzzle/grid/GridCellShape.tsx) komponenst használják a cella poligon rajzolásához (vagy a grafika vágásához a cella alakjára), és a [`GridCellUserArea`](../src/components/puzzle/grid/GridCellUserArea.tsx) komponenst a tartalom megjelenítéséhez a felhasználói területen.

A forgatott és elferdített rácsok és cellák támogatásához a [típuskezelő](./Data%20structures%20and%20types.md) definiálhatja a `processCellDataPosition` függvényt, amely átrendezheti a számjegyek és ceruzajelölések pozícióit és szögeit.
Például:

- A [Cube](../src/puzzleTypes/cube/types/CubeTypeManager.ts), [monument valley](../src/puzzleTypes/monument-valley/types/MonumentValleyTypeManager.ts), [safe cracker](../src/puzzleTypes/safe-cracker/types/SafeCrackerTypeManager.ts) és más típuskezelők a `processCellDataPosition()`-t használják, hogy kompenzálják a cellákra alkalmazott forgatást és a számjegyeket függőlegesen jelenítsék meg.
- A [forgatható számjegy](../src/puzzleTypes/rotatable/types/RotatableDigitTypeManager.ts) és a [jigsaw](../src/puzzleTypes/jigsaw/types/JigsawTypeManager.ts) típuskezelők a függvényt arra használják, hogy az elforgatott rács és régió miatt újrasorrendeljék a ceruzajelöléseket, mert a cella értéke megváltozhat (például 6-ból 9 lesz).

A `processCellDataPosition()` függvény a számjegy vagy ceruzajel pozíciójának alapértelmezett értékét kapja, és vissza kell adja a feldolgozott pozíciót.
Egyszerű transzformációk esetén ez elég.
De ha a ceruzajelölések sorrendje megváltozik, akkor a függvény megkapja a teljes jelöléskészlet adatait, az aktuális jelölés indexét, és egy callbacket, amely az alapértelmezett pozíciót adja vissza az index alapján.
Ezzel a saját pozíciókezelő használhatja a `getCellDataSortIndexes()` segédet a jelölések újrasorrendezéséhez, és tudni fogja az aktuális jelölés helyét az új sorrendben.

A "Interaktív elemek renderelése" szakaszban van leírva, hogyan kezeli a Puzzle TV a cellák pointer eseményeit.

##### Toll eszköz vonalainak és jelöléseinek renderelése

A toll eszköz vonalai és jelölései a [`UserLines` constraint](../src/components/puzzle/constraints/user-lines/UserLines.tsx) segítségével jelennek meg a kijelölt [grid rétegekben](../src/types/puzzle/GridLayer.ts):

- A már meglévő vonalakat a `givenUserLines` rétegben renderelik.
- A felhasználó által éppen rajzolt vonalat (amikor még lenyomva tartja az egeret) a `newUserLines` rétegben renderelik, és itt jelenik meg a vonalszegmensek törlésének jelzése is.

Azért különítik el ezeket a rétegeket, hogy a felhasználó aktuális műveletének jelzése ne kerüljön bele a meglévő vonalak mögé.

##### Interaktív elemek renderelése

A cellákhoz tartozó egyedi interaktív elemeket a korlátok renderelik, a [`interactive` grid rétegben](../src/types/puzzle/GridLayer.ts), lásd a "Korlátok renderelése" részt.

A cellákhoz nem kötődő interaktív elemeket a típuskezelő `PuzzleTypeManager.gridControlsComponent`-je jeleníti meg az SVG-n kívül.

A cellákkal kapcsolatos alapvető interakciók (kijelölés, vonalrajzolás, jelölések rajzolása) a "mouse handler" grid rétegben valósulnak meg, amely közvetlenül az `interactive` réteg előtt van (lásd a "Rácscellák renderelése" részt).
Ezt a [`GridCellMouseHandler`](../src/components/puzzle/grid/GridCellMouseHandler.tsx) komponens kezeli.
A komponens több SVG alakzatot renderel a cella különböző részeihez, hogy meghatározza, melyik részre kattintottak (közép, határ vagy sarok).

Szabályos cellák esetén 4x4-es rácsot renderel egyenlő cellarészekből.
Ez nemcsak a sarokra kattintások és a határkattintások detektálását könnyíti meg, hanem pontosabb többcellás kijelölést is lehetővé tesz, mert a cellák sarkain áthaladó mozdulatokat figyelmen kívül hagyja.
Például ha valaki r1c1-et és r2c2-t akar kijelölni, nagyon nehéz nem áthaladni r1c2 vagy r2c1 sarkán. Ilyenkor a sarokrészek figyelmen kívül hagyása megakadályozza, hogy véletlenül más cellákat is kijelöljön.

Egyedi határokkal rendelkező cellák esetén egy kezelésiszerkezetet renderel a teljes cellára, és külön kezelőket minden határszeletre és sarokra.
A legtöbb cella interakciós alakzatot a cella formájára vágják a [`GridCellShape`](../src/components/puzzle/grid/GridCellShape.tsx) komponenssel, de van egy további klippelés nélküli kattintáskezelő réteg a rács szélén lévő cellákhoz, hogy támogassa a felhasználói gesztusokat a rácson kívül is.

##### Toroidális rács renderelése

Minden rácsréteg a [`GridLoop`](../src/components/puzzle/grid/GridLoop.tsx) komponenst használja, hogy támogatott legyen a looping (toroidális) rácsok renderelése.
A komponens a réteg tartalmát többször jeleníti meg különböző eltolásokkal.

##### A köd renderelése

A ködöt és az izzókat a [`Fog`](../src/components/puzzle/constraints/fog/Fog.tsx) constraint rendereli a [`regular` grid rétegben](../src/types/puzzle/GridLayer.ts).

A köd úgy működik, hogy egy szürke téglalapot rajzol az egész rács fölé, és egy SVG maszkkal szűri ki azokat a cellákat, amelyek ködben vannak.
A felhasználó által színezett cellákat ugyanazzal a maszkkal újrarajzolja a köd fölött, így a cellaszínezés nem rejtőzik el a köd mögött, de nem is látszik a ködön kívüli grafika.

Mivel a köd a `regular` rétegben jelenik meg, és a cellakijelölés jelzései általában alatta vannak, van egy speciális `prioritizeSelection` zászló a [puzzle definíció](../src/types/puzzle/PuzzleDefinition.ts) szintjén, amely a cellakijelölés jelzéseit a `regular` réteg elejére helyezi.
Az ilyen funkciót támogató rejtvényeknek be kell kapcsolniuk ezt a zászlót (ez automatikusan megtörténik az F-Puzzles és a Sudoku Maker importálásakor).