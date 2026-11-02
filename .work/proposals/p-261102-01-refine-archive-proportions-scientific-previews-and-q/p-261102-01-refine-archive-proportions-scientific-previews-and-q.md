# Refine archive proportions, scientific previews and quiet metadata

<!-- ledger-template: proposal.v3 -->

## Original thought

<!-- original-thought:start -->
So. let's fix some shit that still arent ok in the design of blog. then we do the revieew together with eventual shit we can fix
- the alignemtn/positions of the frah90 and other button shit on left right. when we are in article view it's ok... cuz articles follow that horizontal size. but when we are on blog main page.. no. What we could do? how to solve this? solutions could be two.. or move more left more right the shit on header.. or resize the size of blog to the one of articles. what would u do? there is other option? what do u think? bllog hjome page and article view should be consistent?
- the interactive plot shit in the homepage it's not nice as the one in the article. it can also not be the same, but it should somehow have a nicer view.. the curve is a lil bit strange.. the slider could be better such as in the article shit not put there.. this isnt an article will remain obbiously, but what im sayhing here is to design the guidelines that we will help us keep the blog in shape in future (dunno if to store em somewheer). another thing is that in future we could also put shit such as images or gif in that portion, in the preview of th articles in blog shit, the main one on top or the others. so it must be technically possible from day 1
- I dont like the tag filter shit side. and i dont like the tags u applied to articles. Currently the blog is very small, i think no need to apply all that shit. Moreover tags should be smaller.. more discrete. Im thinkin btw if its possible maybe to implement both: tags and category. So maybe.. shti luke "signal processing" become a category.. but shit like "fft" becomes tag. what do u say
- also positioning of tags and shit on top of the article.. in both view both in home page and in article view.. i dont know if i like it. should be more discrete yeah..
- and i dont like thhat green rectangle shit that appear all over shit, in that pic is on the blog article around it.. on phone it appears for example also on the night button shit.. its ugly
<!-- original-thought:end -->

## Proposal

<!-- proposal-body:start -->
## Approach

Trial contextual header alignment: retain the wider archive grid and narrower article reading column, aligning identity/navigation to each canvas where viewport space allows. Preserve edge panel controls and compact phone navigation.

Use a single preview media boundary for images, GIFs, videos and explicit lightweight scientific renderers. The homepage steering plot uses the original array model with consistent 721-point sampling before/after interaction and integrated compact controls. Retain static alternatives and no autoplay.

Restore broad public categories with sparse specific tags. Keep category/date/Demo metadata compact, place article tags below its description, trim demo tags, simplify Explore, and preserve inbound article/tag links. Replace large green focus frames with neutral keyboard cues and title underlines; pointer/touch must not leave persistent frames.

## Guidance and review

Implementation and verification belong to the existing primary roadmap's design phase. docs/visual-guidelines.md records reusable rules. These are inspectable design trials under the owner's request, not final approval or closure of design-2. Site-wide final visual review remains open.
<!-- proposal-body:end -->
