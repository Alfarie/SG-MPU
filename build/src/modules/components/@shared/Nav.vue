<template>
  <aside id="left-panel">

    <!-- User info -->
    <div class="login-info">
      <span>
        <!-- User image size is adjusted inside CSS, it should stay as it -->

        <a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
          <img src="/src/assets/img/avatars/sunny.png" alt="me" class="online" />
          <span>
            Smart Grobot
          </span>
          <i class="fa fa-angle-down"></i>
        </a>

      </span>
    </div>
    <!-- end user info -->

    <!-- NAVIGATION : This navigation is also responsive-->
    <nav>
      <!-- 
				NOTE: Notice the gaps after each icon usage <i></i>..
				Please note that these links work a bit different than
				traditional href="" links. See documentation for details.
				-->

      <ul>

        <li>
          <a href="#">
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Grobot Summary</span>
            <b class="collapse-sign">
              <em class="fa fa-plus-square-o"></em>
            </b>
          </a>
          <ul>
            <router-link to="/grobot-summary/summary" tag="li" active-class="active">
              <a title="Dashboard">
                <i class="fa fa-lg fa-fw fa-gear"></i>
                <span class="menu-item-parent">Summary</span>
              </a>
            </router-link>
            <!-- <router-link to="/grobot-summary/sensors" tag="li" active-class="active">
              <a title="Dashboard" >
                <i class="fa fa-lg fa-fw fa-gear"></i>
                <span class="menu-item-parent">Sensors</span>
              </a>
            </router-link>
            <router-link tag="li" to="/grobot-summary/realtime-graph" active-class="active">
              <a title="Dashboard">
                <i class="fa fa-lg fa-fw fa-gear"></i>
                <span class="menu-item-parent">Real-time graph</span>
              </a>
            </router-link>
            <router-link tag="li" to="/grobot-summary/activity" active-class="active">
              <a title="Dashboard">
                <i class="fa fa-lg fa-fw fa-gear"></i>
                <span class="menu-item-parent">Activity</span>
              </a>
            </router-link> -->
          </ul>
        </li>

        <router-link to='/grobot-control' tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Grobot control</span>
          </a>
        </router-link>

        <li class="top-menu-invisible">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Advance Setting</span>
            <b class="collapse-sign">
              <em class="fa fa-plus-square-o"></em>
            </b>
          </a>
          <ul>
            <router-link to="/grobot-setting/sensors" tag="li" active-class="active">
              <a >
                <i class="fa fa-lg fa-fw fa-gear"></i> Sensors</a>
            </router-link>
            <router-link to="/grobot-setting/activity" tag="li" active-class="active">
              <a >
                <i class="fa fa-lg fa-fw fa-gear"></i> Activity</a>
            </router-link>
            <router-link to="/grobot-setting/network/station" tag="li" active-class="active">
              <a >
                <i class="fa fa-lg fa-fw fa-gear"></i> Network</a>
            </router-link>
            <router-link to="/grobot-setting/datetime" tag="li" active-class="active">
              <a >
                <i class="fa fa-lg fa-fw fa-gear"></i> Date Time</a>
            </router-link>
          </ul>
        </li>

        <router-link to="/grobot-datalogger" tag="li" active-class="active">
          <a>
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent">Data Logger</span>
          </a>
        </router-link>





      </ul>
    </nav>


    <span class="minifyme" data-action="minifyMenu">
      <i class="fa fa-arrow-circle-left hit"></i>
    </span>

  </aside>
</template>
