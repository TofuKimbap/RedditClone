import React from 'react';

import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <div className="post-container">
        <div className="post-votes-container">
          <div className="post-votes">
            <i className="fas fa-arrow-up" />
            <span className="voteCount">30k</span>
            <i className="fas fa-arrow-down" />
          </div>
        </div>
        <div className="post-main">
          <span className="post-author">Posted by u/Lustrelustre 7 hours ago</span>
          <span className="post-title">hi</span>
          <div className="post-text">
            The tall pale man, just looks at us, his face showing only sadness. "You don't belong
            here." He sighed. "You are too young a soul to have actually lived your lives." He grabs
            a bottle and pours me a drink, it is then that I noticed the others sitting next to me.
            My brothers in arms, still wearing their torn uniforms and to the left of me my enemies.
            It was only then that I noticed how eerily silent it was. "How did I get here?" I asked.
            The Bartender looked up and replied in a trembling voice: "You fought, you died. all in
            a silly attempt to protect some imaginary borders." "I am dead?" The Bartender nodded.
            Then my next question arose and before I could ask the man behind the bar answered: "Yes
            I am Death, the one and only, the grim reaper, but the Belgians tend to call me Pietje
            de dood. I like that one, so call me Pete. It's easier in your mother tongue." I nodded
            and looked around, a lot of soldiers were there, some civies, but still. "We are all
            goners, no heaven or hell, just eternally sitting in a bar?" "Oh no no no, I despise war
            and I figured that the least I could do is give you all a drink, you have earned and
            while it is no Valhal, it is something." "why do you hate war?" I asked. Pete stopped
            polishing the glass in his hands and looked at me with great sorrow, took a deep breath
            and answered: "Life is a precious gift of all of creation it is the one thing we cannot
            control, you are born and become self aware, stumbling your way through a universe hell
            bent on chaos. Yet life tend to enjoy that chaos. You live. Humans have a sort of
            understanding, a childlike wonder at everything we and your creators throw at you and
            then you admire it." He poured a drink for himself and leaned on the bar and continued,
            "You show compassion, hate, love and happiness in a world we created. It is the greatest
            form of flattery to see something that we do not control, enjoy something we do control.
            The chaos you bring to a rigid set of rules is amazing and beautiful. So it saddens me
            greatly that you spend it on something as ruining as war, to throw all that potential
            away. Just so you can show how tough you are. You might fight for those that can't fight
            for themselves and those I say bravo, I cheer, because you did something not one being
            besides you can claim: You give your life for other life, for creation. I applaud you,
            while my task is grim and sad, your task was a lot more grim. So this is the least I can
            do." The entire bar was listening to Pete and when he was done we cheered. We toasted in
            his honor, we sang and greeted Death like an old friend, because of all the people
            there, he needed it the most.
          </div>
          <div className="post-detail">
            <span className="post-comment-counter">
              <i className="fas fa-comment-alt" /> 891 Comments
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
