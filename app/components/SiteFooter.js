import { CATS, ORDER } from '../collections/data'
import { POLICIES, POLICY_ORDER } from '../policies/data'

// ONE footer for the whole site.
//
// There used to be eleven hand-copied footers and they had drifted seven ways:
// "Whole Home" was missing from the homepage and /for-designers, "About" and
// "For designers" appeared in a different order on five pages, the homepage
// linked "#precision" while every other page linked "/#precision" (so the
// Materials link did nothing from a sub-page), and Terms and Conditions was
// reachable from only four pages on the whole site. A copied block drifts; a
// component cannot. Same reason blocks are widgets in jbc-ops.
//
// Collections and Policies are read from their own data files, so adding a
// collection or a policy adds it to the footer of every page at once.
export default function SiteFooter() {
  return (
    <footer><div className="shell">
      <div className="footgrid">
        <div>
          <div className="footlock" role="img" aria-label="Berco. The Heart of Your Home">Berco. The Heart of Your Home</div>
          {/* Each contact line is its own block, not three links separated by <br/>.
              The <br/> version gave them 21px-tall hit boxes 26px apart, which is
              too close together to enlarge: a 44px box on each would have
              overlapped its neighbour, and two targets fighting over the same
              pixels is worse than one that is small. As blocks they can simply
              be padded. */}
          <div className="foot-contact">
            <a className="fc-line" href="mailto:sales@bercohome.com">sales@bercohome.com</a>
            <a className="fc-line" href="tel:+639178000730">0917 800 0730</a>
            {/* ?ref= arrives with the conversation and is readable in ManyChat, so a
                website-originated chat can be told apart from an ad-originated one. */}
            <a className="fc-line" href="https://m.me/bercophilippines?ref=website-footer" rel="noopener">Message us on Messenger</a>
            <p className="fc-note">Mandaluyong &amp; Cebu · Projects nationwide · JBC UNLTD CORP</p>
          </div>
        </div>
        <div className="footcol">
          <h3>Collections</h3>
          {ORDER.map((s) => <a href={`/collections/${s}`} key={s}>{CATS[s].name}</a>)}
        </div>
        <div className="footcol">
          <h3>Studio</h3>
          <a href="/collections">Collections</a>
          <a href="/catalogues">Catalogues</a>
          <a href="/how-we-work">How we work</a>
          <a href="/for-designers">For designers</a>
          <a href="/#precision">Materials</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footcol">
          <h3>Policies</h3>
          {POLICY_ORDER.map((s) => <a href={`/${s}`} key={s}>{POLICIES[s].name}</a>)}
        </div>
      </div>
      <div className="legal">
        <span>© 2026 Berco. JBC UNLTD CORP.</span>
        <span className="legal-links">
          <a href="/delivery-policy">Delivery</a>
          <a href="/returns-policy">Returns &amp; warranty</a>
          <a href="/terms">Terms</a>
          <a href="/privacy-policy">Privacy</a>
        </span>
      </div>
    </div></footer>
  )
}
