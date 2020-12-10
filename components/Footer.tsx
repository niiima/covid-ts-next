import styled from 'styled-components'
 const SiteFooter = ()=> (
    <Footer className="site-footer">
        <div className="container">
        <div className="row">
            <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Covid React <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Nivnet focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in TypeScript programming language along with Next.js and React.js</p>
            </div>

            <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
                <li><a href="http://covid-react.com/category/c-language/">Countries</a></li>
                <li><a href="http://covid-react.com/category/front-end-development/">Charts</a></li>
            </ul>
            </div>

            <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
                <li><a href="http://covid-react.com/about/">About Us</a></li>
                <li><a href="http://covid-react.com/contact/">Contact Us</a></li>
                <li><a href="http://covid-react.com/contribute-at-covid-react/">Contribute</a></li>
                <li><a href="http://covid-react.com/privacy-policy/">Privacy Policy</a></li>
                <li><a href="http://covid-react.com/sitemap/">Sitemap</a></li>
            </ul>
            </div>
        </div>
        <hr />
        </div>
        <div className="container">
        <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; MIT
        <a href="#">NivNet.ir</a>.
            </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
                <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
            </ul>
            </div>
        </div>
        </div>
    </Footer>
)

//const StyledFooter = styled(Footer)`
const Footer = styled.footer`
  background-color:#26272b;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;

& hr
{
  border-top-color:#bbb;
  opacity:0.5
}
& hr.small
{
  margin:20px 0
}
& h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
& a
{
  color:#737373;
}
& a:hover
{
  color:#3366cc;
  text-decoration:none;
}
& .footer-links
{
  padding-left:0;
  list-style:none
}
& .footer-links li
{
  display:block
}
& .footer-links a
{
  color:#737373
}
& .footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
& .footer-links.inline li
{
  display:inline-block
}
&  .social-icons
{
  text-align:right
}
& .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
& .copyright-text
{
  margin:0
}
@media (max-width:991px)
{
   [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  
  {
    padding-bottom:0
  }
   .copyright-text, .social-icons
  {
    text-align:center
  }
}
& .social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
& .social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
& .social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
& .social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
& .social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
& .social-icons a.facebook:hover
{
  background-color:#3b5998
}
& .social-icons a.twitter:hover
{
  background-color:#00aced
}
& .social-icons a.linkedin:hover
{
  background-color:#007bb6
}
& .social-icons a.dribbble:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}
`

export default SiteFooter;