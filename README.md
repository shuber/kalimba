# Kalimba

## Notes

#### Check out [VexFlow](http://www.vexflow.com/)

VexFlow is an open-source online music notation rendering API. It is written completely in JavaScript, and runs right in the browser. VexFlow supports HTML5 Canvas and SVG.


#### From Stanford's [Specifying a tablature staff](http://www.slac.stanford.edu/grp/eg/minos/dist/dist_aux4/overflowfromgmieg/Mup/uguide/tabstaff.html) article

To set up a tablature staff, you use the stafflines parameter. To get a standard 6-line guitar tablature staff, you can just say 

    score
      staffs=2
    staff 2
      stafflines = tab

There are 2 staffs, because there is both the tablature staff and the automatically generated tabnote staff. The tablature staff is always immediately below the corresponding tabnote staff. Setting the stafflines parameter to "tab" marks staff 2 as a tablature staff.
If you want tablature for an instrument other than a 6-string guitar with standard tuning, you specify the pitches of the strings from top to bottom within parentheses after the "tab." For example: 

    stafflines = tab (e a d& g)

would define some instrument that had 4 strings, with the string on the top line of tablature staff being an e string, the next a, the next d flat, and the bottom g. As shown in the example, pitches can include a # or & if necessary. Strings are assumed to be in octave 4 unless otherwise marked. You can specify a different octave by specifying an octave number after the string's pitch (using either an absolute octave number or pluses or minuses). If the instrument has more than one string with the same pitch (even if they are in different octaves), they must be distinguished by adding one or more ' marks after the pitch. The tablature definition for standard guitar is 

    stafflines = tab (e5 b g d a3 e'3)

This specifies that the top string on the staff is e in octave 5. The next three strings are in the default octave of 4, and the last two strings are in octave 3. Since there are two different strings with pitch letter of e, the lower e is marked as e'. Note that the octaves given are how they should be printed on the tabnote staff. A standard guitar actually sounds an octave lower than written. If you just use "stafflines = tab" without specifying any strings, Mup not only assumes the standard guitar layout, and prints in the appropriate octave, but it also automatically transposes the MIDI output to the actual pitches an octave lower. If you specify strings explicitly, you will have to specify the octaves and any desired MIDI transposition values yourself. Stated another way,

    score
      staffs = 2
    staff 2
      stafflines = tab

is equivalent to 

    score
      staffs=2
    staff 2
      stafflines = tab (e5 b g d a3 e'3)
    staff 1
      ifdef MIDI transpose = down perfect 8 endif

Note from this last example that MIDI is taken from the tabnote staff, not the tablature staff, so MIDI directives should be placed with the tabnote staff.

Mup should be able to handle almost any instrument with up to 9 strings. Several strings can have the same pitch; you just need to distinguish them with ' marks. The strings must be listed in whatever order the strings are to appear on the tablature staff. As another example, 

    stafflines = tab (g3 d3 a2 e2)

would define a standard bass guitar. Note that a bass guitar also sounds an octave lower than written, so it should be transposed for MIDI purposes.