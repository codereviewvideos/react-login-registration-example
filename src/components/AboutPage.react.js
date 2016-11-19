import React from 'react';
import {Link} from 'react-router';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div>
      <h2 className="alt-header">About</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt magna eu leo sagittis, vel convallis dui bibendum. Nunc elementum ipsum varius justo gravida finibus. In sagittis turpis id augue pharetra facilisis. Praesent elit lorem, ornare vel orci vel, luctus convallis ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus pulvinar ligula mi, a interdum dolor gravida id. Vivamus dictum, risus in dictum malesuada, purus neque euismod enim, eu varius sem neque egestas arcu.
      </p>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </div>
  );
};

export default AboutPage;
