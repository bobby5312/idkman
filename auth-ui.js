export function setupNavAuth(auth, user, signOutFunc, redirectOnSignOut = false) {
    const navSigninBtn = document.getElementById('navSigninBtn');
    const navDashboard = document.getElementById('navDashboard');

    if (user) {
        // Authenticated state
        if (navDashboard) navDashboard.style.display = 'block';
        if (navSigninBtn) {
            navSigninBtn.textContent = 'Sign Out';
            navSigninBtn.href = '#';
            navSigninBtn.classList.remove('active'); // active styling looks odd for signout
            navSigninBtn.onclick = (e) => {
                e.preventDefault();
                showSignoutModal(auth, signOutFunc, redirectOnSignOut);
            };
        }
    } else {
        // Unauthenticated state
        if (navDashboard) navDashboard.style.display = 'none';
        if (navSigninBtn) {
            navSigninBtn.textContent = 'Sign In';
            navSigninBtn.href = 'signin.html';
            navSigninBtn.onclick = null;
            if (window.location.pathname.includes('signin.html')) {
                navSigninBtn.classList.add('active');
            }
        }
        if (redirectOnSignOut) {
            window.location.href = 'signin.html';
        }
    }
}

function showSignoutModal(authInst, signOutFunc, redirectOnSignOut) {
    let overlay = document.getElementById('signoutOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'signoutOverlay';
        overlay.className = 'signout-overlay';
        overlay.innerHTML = `
      <div class="signout-modal">
        <h2>Sign Out</h2>
        <p>Are you sure you want to log out of your account?</p>
        <div class="signout-buttons">
          <button class="signout-btn signout-cancel" id="signoutCancelBtn">Cancel</button>
          <button class="signout-btn signout-confirm" id="signoutConfirmBtn">Sign Out</button>
        </div>
      </div>
    `;
        document.body.appendChild(overlay);

        document.getElementById('signoutCancelBtn').onclick = () => {
            overlay.classList.remove('visible');
        };

        document.getElementById('signoutConfirmBtn').onclick = () => {
            signOutFunc(authInst).then(() => {
                overlay.classList.remove('visible');
                if (redirectOnSignOut) {
                    window.location.href = 'signin.html';
                }
            });
        };
    }
    // Delay slightly to trigger CSS transition
    setTimeout(() => overlay.classList.add('visible'), 10);
}

export function openSignoutModal(authInst, signOutFunc, redirectOnSignOut = false) {
    showSignoutModal(authInst, signOutFunc, redirectOnSignOut);
}
