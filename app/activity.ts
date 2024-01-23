type Activity = {
    category: String,
    name: String,
}

interface VideoActivity extends Activity {
    url: String
}

interface Group extends Activity {
    url: String
}